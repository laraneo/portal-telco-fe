import React, { FunctionComponent, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import _ from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    transferListroot: {
      margin: "auto",
      justifyContent: 'center',
    },
    cardHeader: {
      color: '#2980b9',
      fontWeigth: 'bold',
    },
    list: {
      height: 150,
      width: 300,
      backgroundColor: theme.palette.background.paper,
      overflow: "auto"
    },
    button: {
      margin: theme.spacing(0.5, 0)
    }
  })
);

function not(a: number[], b: number[]) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a: number[], b: number[]) {
  return a.filter(value => b.indexOf(value) !== -1);
}

function union(a: number[], b: number[]) {
  return [...a, ...not(b, a)];
}

type TransferListProps = {
  data: any;
  leftTitle: any;
  selectedData: any;
  onSelectedList: Function;
  getLabel?: Function;
};

const TransferList: FunctionComponent<TransferListProps> = ({
  data,
  leftTitle,
  onSelectedList,
  selectedData,
  getLabel,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState<number[]>([]);
  const [left, setLeft] = React.useState<number[]>(data);
  const [right, setRight] = React.useState<number[]>(selectedData);

  useEffect(() => {
    if (data.length > 0 && selectedData.length > 0) {
      setRight(selectedData)
      const newArray: any = [];
      data.forEach((element: any) => {
        const selectedItem = selectedData.filter(
          (item: any) => item.description === element.description
        );
        if (_.isEmpty(selectedItem)) {
          newArray.push(element);
        }
      });
      setLeft(newArray);
    }
  }, [data, setLeft, selectedData]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: number[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    
    updateList(right.concat(leftChecked),'add', leftChecked);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    updateList(not(right, rightChecked),'remove', rightChecked);
    
  };

  const updateList = (list: any, type: string, selected: any) => {
    const arrayKeys = list.map((element: any) => element.id);
    onSelectedList(arrayKeys, type, selected);
  }

  const customList = (title: React.ReactNode, items: number[]) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            color="primary"
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={`${title} ${numberOfChecked(items)}/${items.length}`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value: any, i: number) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          const label = getLabel ? getLabel(value) : value.description;
          return (
            <ListItem
              key={i}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  color="primary"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={label} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
  const newLefArray = _.sortBy(left, (o: any) => o.id);
  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.transferListroot}
    >
      <Grid item>{customList(leftTitle, newLefArray)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList("Seleccionados", right)}</Grid>
    </Grid>
  );
};

export default TransferList;
