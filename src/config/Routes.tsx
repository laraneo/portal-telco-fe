import React from "react";
import { HashRouter, Route, Switch} from "react-router-dom";

import Dashboard from "../containers/dashboard";
import Modal from "../components/Modal";
import SecondModal from "../components/SecondModal";
import SnackBar from "../components/SnackBar";
import Login from "../containers/login";
import User from "../containers/user";
import Home from "../containers/home";
import ExpirationCard from "../containers/Templates/ExpirationCard";
import Parameter from "../containers/parameter";
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
import Contact from "../containers/contact";
import RegisterPassword from "../containers/registerPassword";
import LoadRequest from "../containers/LoadRequest";
import MyRequest from "../containers/MyRequest";
import MyManagerRequests from "../containers/MyManagerRequests";

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
                      <Route path="/dashboard/user" component={User} />
                      <Route path="/dashboard/widget" exact component={Widget} />
                      <Route path="/dashboard/menu" exact component={Menu} />
                      <Route path="/dashboard/menu-item" exact component={MenuItem} />
                      <Route path="/dashboard/parameter" exact component={Parameter} />
                      <Route path="/dashboard/not-found" exact component={NotFound} />
                      <Route path="/dashboard/about" exact component={About} />
                      <Route path="/dashboard/help" exact component={Help} />
                      <Route path="/dashboard/my-access" exact component={MyAccess} />
                      <Route path="/dashboard/contact" exact component={Contact} />
                      <Route path="/dashboard/update-password" exact component={RegisterPassword} />
                      <Route path="/dashboard/load-request" exact component={LoadRequest} />
                      <Route path="/dashboard/my-requests" exact component={MyRequest} />
                      <Route path="/dashboard/client-requests" exact component={MyManagerRequests} />
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
