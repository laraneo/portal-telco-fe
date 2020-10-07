import React, { useEffect } from "react";
import { HashRouter, Route, Switch} from "react-router-dom";
import { useDispatch } from "react-redux";

import Dashboard from "../containers/dashboard";
import Modal from "../components/Modal";
import SecondModal from "../components/SecondModal";
import MainLayout from "../Hoc/MainLayout";
import SnackBar from "../components/SnackBar";
import Login from "../containers/login";
import { checkLogin } from "../actions/loginActions";
import Person from "../containers/person";
import User from "../containers/user";
import Home from "../containers/home";
import Reports from "../containers/reports";
import ExpirationCard from "../containers/Templates/ExpirationCard";
import Parameter from "../containers/parameter";
import Partners from "../containers/partner";
import ReportePagos from "../containers/reportePagos";
import StatusAccount from "../containers/StatusAccount";
import Widget from "../containers/widget";
import Menu from "../containers/menu";
import Permission from "../containers/permission";
import Role from "../containers/role";
import MainLoader from "../components/MainLoading";
import MenuItem from "../containers/MenuItem";
import CustomModal from "../components/CustomModal";
import NotFound from "../containers/notFound";
import About from "../containers/about";
import Help from "../containers/help";
import MyAccess from "../containers/MyAccess";
import PaymentsManagement from "../containers/paymentsManagement";
import UnpaidInvoices from "../containers/unpaidInvoices";
import ReportedPayments from "../containers/reportedPayments";
import Contact from "../containers/contact";
import RegisterPassword from "../containers/registerPassword";
import PendingInvoices from "../containers/pending-invoices";
import SinglePaymentsManagement from "../containers/singlePaymentsManagement";
import PersonMobile from "../containers/personMobile";

export default function Routes() {
  return (
    <HashRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/template/expiration-cards" component={ExpirationCard} />
          <Route
            path="/dashboard"
            exact={false}
            component={() => {
                return (
                  <Switch>
                    <Dashboard>
                      <Route path="/dashboard/main" component={Home} />
                      <Route path="/dashboard/role" component={Role} />
                      <Route
                        path="/dashboard/permission"
                        component={Permission}
                      />
                      <Route path="/dashboard/reports" component={Reports} />
                      <Route path="/dashboard/user" component={User} />
                      <Route path="/dashboard/actualizacion-datos" component={Person} />
                      <Route path="/dashboard/actualizacion-datos-mobile" component={PersonMobile} />
                      <Route path="/dashboard/partner" component={Partners} />
                      <Route path="/dashboard/reporte-pagos" component={ReportePagos} />
                      <Route path="/dashboard/status-account" component={StatusAccount} />
                      <Route path="/dashboard/widget" exact component={Widget} />
                      <Route path="/dashboard/menu" exact component={Menu} />
                      <Route path="/dashboard/menu-item" exact component={MenuItem} />
                      <Route path="/dashboard/parameter" exact component={Parameter} />
                      <Route path="/dashboard/not-found" exact component={NotFound} />
                      <Route path="/dashboard/about" exact component={About} />
                      <Route path="/dashboard/help" exact component={Help} />
                      <Route path="/dashboard/my-access" exact component={MyAccess} />
                      <Route path="/dashboard/payments-management" exact component={PaymentsManagement} />
                      <Route path="/dashboard/single-payments-management" exact component={SinglePaymentsManagement} />
                      <Route path="/dashboard/unpaid-invoices" exact component={UnpaidInvoices} />
                      <Route path="/dashboard/reported-payments" exact component={ReportedPayments} />
                      <Route path="/dashboard/contact" exact component={Contact} />
                      <Route path="/dashboard/update-password" exact component={RegisterPassword} />
                      <Route path="/dashboard/pending-invoices" exact component={PendingInvoices} />
                    </Dashboard>
                  </Switch>
                );
            }}
          />
        </Switch>
        <Modal />
        <SecondModal />
        <CustomModal />
        <SnackBar />
        <MainLoader />
    </HashRouter>
  );
}
