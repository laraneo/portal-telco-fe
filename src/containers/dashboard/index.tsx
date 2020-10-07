import React, { useEffect, FunctionComponent, useCallback, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from '@material-ui/icons/Settings';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse'
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import LockIcon from "@material-ui/icons/Lock";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import _ from 'lodash';

import queryString from "query-string";

import { logout, setForcedLogin, checkLogin, setupInterceptors } from "../../actions/loginActions";
import AccessControlForm from "../../components/AccessControlForm";
import { updateModal } from "../../actions/modalActions";
import { getList as getMenuList, getWidgetList } from "../../actions/menuActions";
import { getAll as getGenderAll } from "../../actions/genderActions";
import { getList as getLockerLocationList } from "../../actions/lockerLocationsActions";
import { getAll as getStatusPersonAll } from "../../actions/statusPersonActions";
import { getAll as getMaritalStatusAll } from "../../actions/maritalStatusActions";
import { getAll as getCountries } from "../../actions/countryActions";
import { getAll as getRelationTypes } from "../../actions/relationTypeActions";
import { getAll as getSports } from "../../actions/sportActions";
import { getAll as getProfessions } from "../../actions/professionActions";
import { getList as getParameterList } from "../../actions/parameterActions";
import { getList as getBranchCompanyList } from "../../actions/branchCompanyActions";
import Loader from "../../components/common/Loader";
import { getClient } from "../../actions/personActions";
import icons from "../../helpers/collectionIcons";
import { Chip, Grid } from "@material-ui/core";
import Logo from "../../components/Logo";
import Helper from '../../helpers/utilities';
import { getTasa } from "../../actions/webServiceActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    },
    menuContainer: {
      fontSize: '10px',
    },
    profileButton: {
      background: 'white'
    },
    hideMobileMenu: {
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      },
    },
    hideDeskMenu: {
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      },
    }
  })
);

interface SubMenuProps {
  menu: Array<string | number>;
  item: any;
}

const SubMenu: FunctionComponent<SubMenuProps> = ({ menu, item }) => {
  const [menuItem, setMenuItem] = useState(null);
  const history = useHistory();
  const classes = useStyles();
  const findChildrens: any = menu.filter((e: any) => e.parent == item.id);
  let Icon = SettingsIcon;
  if (item.icons) {
    let currenMenutIcon = icons.find((e: any) => e.slug === item.icons.slug);
    if (currenMenutIcon) {
      Icon = currenMenutIcon.name;
    }
  }

  const handleRoute = (path: string) => {
    history.push(path);
  };

  const handleSubMenu = (currentItem: any) => {
    if (menuItem === currentItem) {
      setMenuItem(null);
    } else {
      setMenuItem(currentItem);
    }
  }

  const handleSubMenuOrRoute = useCallback(() => {
    findChildrens.length > 0 ? handleSubMenu(item.id) : handleRoute(item.route ? item.route : '/dashboard/main')
  },
    [item, findChildrens],
  );
  const mobile = item.show_mobile !== null && item.show_mobile === "0" ? classes.hideMobileMenu : '';
  const desk = item.show_desk !== null && item.show_desk === "0" ? classes.hideDeskMenu : '';
  return (
    <React.Fragment key={item.id}>
      <ListItem button onClick={handleSubMenuOrRoute} className={`${mobile} ${desk}`}>
        <ListItemIcon >
          <Icon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
        {findChildrens.length > 0 && (
          item.id === menuItem ? <IconExpandLess /> : <IconExpandMore />
        )
        }
      </ListItem>
      {findChildrens.length > 0 && (
        <Collapse in={item.id === menuItem || false} timeout="auto" unmountOnExit>
          <List dense>
            {findChildrens.map((e: any, i: number) => <SubMenu key={i} menu={menu} item={e} />)}
          </List>
        </Collapse>
      )

      }
    </React.Fragment>
  )
}

interface ResponsiveDrawerProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children?: any;
  container?: Element;
}

export default function Dashboard(props: ResponsiveDrawerProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { container, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [subMenuItem, setSubMenuItem] = React.useState(null);
  const [subMenuItem2, setSubMenuItem2] = React.useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, loading, userRoles } = useSelector((state: any) => state.loginReducer);

  const { listData: menuList } = useSelector((state: any) => state.menuReducer);

  const {
    parameterReducer: { listData: parameterList },
    menuReducer: { loading: menuLoading },
    webServiceReducer: { tasa },
  } = useSelector((state: any) => state);

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);


  const checkAuthRoutes = (items: Array<string | number>) => {
    const route = location.pathname === '/dashboard' ? '/dashboard/main' : location.pathname;
    const isValid = items.find((e: any) => e.route === route);
    if (!isValid) {
      window.location.href = "/#/dashboard/main";
    }
  }

  useEffect(() => {
    history.listen((location, action) => {
      if (!_.isEmpty(menuList) && menuList.items.length > 0) {
        const route = location.pathname === '/dashboard' ? '/dashboard/main' : location.pathname;
        const isValid = menuList.items.find((e: any) => e.route === route);
        if (!isValid) {
          window.location.href = "/#/dashboard/main";
        }
      }
    });
  }, [menuList])

  useEffect(() => {
    async function run() {
      const values = queryString.parse(location.search);
      if (!_.isEmpty(values) && values.socio && values.token) {
        if (
          location.pathname === "/dashboard/status-account" ||
          location.pathname === "/dashboard/actualizacion-datos"
        )
          await dispatch(setForcedLogin(values.socio, values.token));
      }
      checkLogin()(dispatch).then(() => {
        if (location.pathname !== '/') {
          dispatch(setupInterceptors());
        }
        dispatch(getMenuList(location.pathname));
        dispatch(getClient(user.username));
        dispatch(getProfessions());
        dispatch(getWidgetList());
        dispatch(getParameterList());
        dispatch(getGenderAll());
        dispatch(getLockerLocationList());
        dispatch(getStatusPersonAll());
        dispatch(getMaritalStatusAll());
        dispatch(getCountries());
        dispatch(getRelationTypes());
        dispatch(getSports());
        dispatch(getBranchCompanyList());
        dispatch(getTasa());
      })   
    }
    run();
  }, [dispatch])

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      history.push('/dashboard/main');
    }
  }, [history, location]);






  function handleClick(value: number) {
    switch (value) {
      case 1:
        setOpen1(!open1)
        break;
      case 2:
        setOpen2(!open2)
        break;
      case 3:
        setOpen3(!open3)
        break;
      case 4:
        setOpen4(!open4)
        break;
      case 5:
        setOpen5(!open5)
        break;
      default:
        break;
    }
  }

  function setSubMenu(currentItem: any) {
    if (subMenuItem == currentItem) {
      setSubMenuItem(null);
    } else {
      setSubMenuItem(currentItem);
    }
  }

  function setSecondSubMenu(currentItem: any) {
    if (subMenuItem2 == currentItem) {
      setSubMenuItem2(null);
    } else {
      setSubMenuItem2(currentItem);
    }
  }

  const renderThirdMenu = (item: any) => {
    let Icon = SettingsIcon;
    if (item.icons) {
      let currenMenutIcon = icons.find((e: any) => e.slug === item.icons.slug);
      if (currenMenutIcon) {
        Icon = currenMenutIcon.name;
      }
    }
    return (
      <ListItem button onClick={() => handeClick(item.route ? item.route : '/dashboard/main')}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
    )
  }

  const renderSecondMenu = (CustomIcon: React.ReactType, title: string, route: string, menu: any, item: any) => {
    const findChildrens: any = menu.filter((e: any) => e.parent == item.id);
    let Icon = SettingsIcon;
    if (item.icons) {
      let currenMenutIcon = icons.find((e: any) => e.slug === item.icons.slug);
      if (currenMenutIcon) {
        Icon = currenMenutIcon.name;
      }
    }
    return (
      <React.Fragment key={item.id}>
        <ListItem button onClick={() => findChildrens.length > 0 ? setSecondSubMenu(item.id) : handeClick(item.route ? item.route : '/dashboard/main')}>
          <ListItemIcon >
            <Icon />
          </ListItemIcon>
          <ListItemText primary={item.name} />
          {findChildrens.length > 0 && (
            item.id === subMenuItem2 ? <IconExpandLess /> : <IconExpandMore />
          )
          }
        </ListItem>
        {findChildrens.length > 0 && (
          <Collapse in={item.id === subMenuItem2 ? true : false} timeout="auto" unmountOnExit>
            <List dense>
              {findChildrens.map((e: any) => renderThirdMenu(e))}
            </List>
          </Collapse>
        )

        }
      </React.Fragment>
    )
  }


  function build(menu: any) {
    return menu.map((item: any, i: number) => {
      if (item.parent === "0") {
        const findChildrens: any = menu.filter((e: any) => e.parent == item.id);
        let Icon = SettingsIcon;
        if (item.icons) {
          let currenMenutIcon = icons.find((e: any) => e.slug === item.icons.slug);
          if (currenMenutIcon) {
            Icon = currenMenutIcon.name;
          }
        }
        const mobile = item.show_mobile !== null && item.show_mobile == "0" ? classes.hideMobileMenu : '';
        const desk = item.show_desk !== null && item.show_desk == "0" ? classes.hideDeskMenu : '';

        return (
          <React.Fragment key={i}>
            <ListItem 
              button onClick={() => findChildrens.length > 0 ? setSubMenu(item.id) : handeClick(item.route ? item.route : '/dashboard/main')}
              className={`${desk} ${mobile}`}
              >
              <ListItemIcon >
                <Icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
              {findChildrens.length > 0 && (
                item.id === subMenuItem ? <IconExpandLess /> : <IconExpandMore />
              )
              }
            </ListItem>
            {findChildrens.length > 0 && (
              <Collapse in={item.id === subMenuItem ? true : false} timeout="auto" unmountOnExit>
                <List dense>
                  {findChildrens.map((e: any, i: number) => <SubMenu key={i} menu={menu} item={e} />)}
                </List>
              </Collapse>
            )

            }
          </React.Fragment>
        )
      }
    })
  }

  function buildMenu(menu: any) {
    return build(menu);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handeClick = (path: string) => {
    history.push(path);
    setAnchorEl(null);
  };

  const handleLogout = () => dispatch(logout());

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccessControl = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <AccessControlForm />,
          customSize: 'medium'
        }
      })
    );
  }
  const renderMenu = (Icon: React.ReactType, title: string, route: string) => (
    <ListItem button>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={title}
        onClick={() => handeClick(route)}
      />
    </ListItem>
  )

  const renderFirstMenu = (Icon: React.ReactType, title: string, route: string) => (
    <MenuItem>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={title}
        onClick={() => handeClick(route)}
      />
    </MenuItem>
  )

  const getRole = (role: string) => !_.isEmpty(user) ? user.roles.find((e: any) => e.slug === role) : '';

  const drawer = () => {
    if (menuLoading) {
      return (
        <div style={{ textAlign: 'center', marginTop: 20 }} >
          <Loader />
        </div>
      )
    }
    return (
      <div>
        <Logo />
        <Divider />
        <List dense >
          {!_.isEmpty(menuList) && buildMenu(menuList.items)}
          {/* <ListItem button onClick={() => handleClick(3)}>
          <ListItemIcon >
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Seguridad" />
          {open3 ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>

        <Collapse in={open3} timeout="auto" unmountOnExit>
          <List dense>
            {renderFirstMenu(PeopleIcon, "Roles", "/dashboard/role")}
            {renderFirstMenu(LockIcon, "Permisos", "/dashboard/permission")}
            {renderFirstMenu(DoubleArrowIcon, "Widget", "/dashboard/widget")}
            {renderFirstMenu(DoubleArrowIcon, "Menu", "/dashboard/menu")}
            {renderFirstMenu(DoubleArrowIcon, "Menu Item", "/dashboard/menu-item")}
          </List>
        </Collapse>
        {!_.isEmpty(user) && getRole('socio') && (
              <React.Fragment>
                {renderFirstMenu(DashboardIcon, "Inicio", "/dashboard/main")}
                {renderFirstMenu(CommentIcon, "Notas", "")}
                {renderFirstMenu(AccountCircleIcon, "Actualizacion de datos", "/dashboard/actualizacion-datos")}
                {renderFirstMenu(PaymentIcon, "Reporte de Pagos", "/dashboard/reporte-pagos")}
                {renderFirstMenu(PaymentIcon, "Estado de Cuenta", "/dashboard/status-account")}
                {renderFirstMenu(AssignmentLateIcon, "Facturas por Pagar", "/dashboard/facturas-por-pagar")}
              </React.Fragment>
            )
          }
          {
            !_.isEmpty(user) && getRole('promotor') && (
              <React.Fragment>
                {renderFirstMenu(DashboardIcon, "Inicio", "/dashboard/main")}
                {renderFirstMenu(AccountCircleIcon, "Socios", "/dashboard/partner")}
              </React.Fragment>
            )
          } */}
        </List>
      </div>
    )
  };
  // const nameRole: any = !_.isEmpty(user) ? user.role.name : '';
  const currentRole = userRoles.find((e: any) => e.slug === 'socio');
  const parameter = Helper.getParameter(parameterList, 'CLIENT_NAME')
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.header}>
            <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={6} onClick={ () => history.push('/dashboard/main')} style={{ cursor: 'pointer' }}>
                  <Typography variant="h6" noWrap >
                    <Grid container spacing={1}>
                      <Grid item xs={12}>Portal de Socio</Grid>
                    </Grid>
                    <Grid item xs={12} style={{ fontSize: 14, fontStyle: 'italic' }}>{parameter.value}</Grid>
                  </Typography>
                </Grid>

              <Grid item xs={6} sm={6} md={6} style={{ textAlign: 'right' }}>
                <Typography variant="h6" noWrap style={{ lineHeight: 3 }} >
                  <div>
                    <Button
                      startIcon={<AccountCircleIcon />}
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      className={classes.profileButton}
                    >
                      {!loading && user.name}
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem><AccountCircleIcon /> Usuario: {!loading && user.name}</MenuItem>
                      {
                        !currentRole && (
                          <MenuItem><AssignmentIndIcon />Rol: {userRoles.length > 0 && userRoles.map((element: any) => (<Chip label={element.name} color="primary" size="small" />))}</MenuItem>
                        )
                      }
                      <MenuItem onClick={() => history.push('/dashboard/update-password')} ><LockIcon /> Cambio de Clave</MenuItem>
                      <MenuItem onClick={() => history.push('/dashboard/my-access')}><AccessTimeIcon /> Mi QR</MenuItem>
                      <MenuItem onClick={() => handleLogout()}><ExitToAppIcon /> Logout</MenuItem>
                    </Menu>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer()}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer()}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children && children}
      </main>
    </div>
  );
}
