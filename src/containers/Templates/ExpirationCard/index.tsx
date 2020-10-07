import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import PrintIcon from "@material-ui/icons/Print";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import LoadingButton from "../../../components/FormElements/LoadingButton";
import { geReports, getAll } from "../../../actions/personActions";
import "./index.sass";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'relative',
    },
    table: {
      width: "100%"
    },
    th: {
      "&th": {
        fontSize: "8px",
        borderBottom: "1px black solid",
        paddingBottom: "5px",
        textAlign: "left"
      }
    },
    progress: {
      margin: theme.spacing(2),
      position: "relative",
      top: "45%"
    }
  })
);

export default function ExpirationCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, secondLoading } = useSelector(
    (state: any) => state.personReducer
  );

  // useEffect(() => {
  //   dispatch(getAll());
  // }, [dispatch]);

  const handleReport = () => {
    dispatch(geReports());
  };
  if (loading) {
    return (
      <div className="expiration-card-container__loader">
        <CircularProgress className={classes.progress} color="primary" />
      </div>
    );
  }
  return (
    <div className="expiration-card-container">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} className="expiration-card-container__title">
            Lista de Vencimiento de Tarjetas
          </Grid>
          <Grid item xs={12}>
            <table className="expiration-card-container__table">
              <thead>
                <tr>
                  <th className={classes.th}>Accion</th>
                  <th className={classes.th}>Titular</th>
                  <th className={classes.th}>Cedula</th>
                  <th className={classes.th}>Numero de tarjeta</th>
                  <th className={classes.th}>Banco</th>
                  <th className={classes.th}>Vencimiento</th>
                  <th className={classes.th}>Socio</th>
                  <th className={classes.th}>Telf 1</th>
                  <th className={classes.th}>Telf 2</th>
                  <th className={classes.th}>Cedula 1</th>
                  <th className={classes.th}>Cedula 2</th>
                </tr>
              </thead>
              <tbody>
                {/* {persons.length > 0 &&
                  persons.map((element: any) => (
                    <tr>
                      <td> Dummy </td>
                      <td>
                        {element.name} {element.last_name}
                      </td>
                      <td> {element.rif_ci} </td>
                      <td> {element.card_number} </td>
                      <td> Banesco </td>
                      <td> {element.expiration_date} </td>
                      <td> {element.representante} </td>
                      <td> {element.telephone1} </td>
                      <td> {element.telephone2} </td>
                      <td> {element.phone_mobile1} </td>
                      <td> {element.phone_mobile2} </td>
                    </tr>
                  ))} */}
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
                <tr>
                  <td>063810</td>
                  <td>Rigoberto Lanz</td>
                  <td>18945678</td>
                  <td>540133009338284</td>
                  <td>Banesco</td>
                  <td>01-MAR-2018</td>
                  <td>Rigoberto Lanz</td>
                  <td>023952858</td>
                  <td>023952858</td>
                  <td>0416225858</td>
                  <td>0416225858</td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
        <div className="expiration-card-container__print">
          <LoadingButton
            Icon={PrintIcon}
            loading={secondLoading}
            handleClick={handleReport}
          />
        </div>
      </div>
    </div>
  );
}
