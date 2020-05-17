import React, { Component } from "react";
import * as jwtDecode from "jwt-decode";
import { connect } from "react-redux";

import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import HomePageWeb from "../pages/web/home";
import CenterPageWeb from "../pages/web/center";
import AboutPageWeb from "../pages/web/about";
import SpecialityPageWeb from "../pages/web/speciality";
import HomePage from "../pages/agenda/home";
import ProfilePage from "../pages/agenda/profile";
import Error404Page from "../pages/agenda/error/404";
import LoginPage from "../pages/agenda/auth/login";
import LogoutPage from "../pages/agenda/auth/logout";
import RePassPage from "../pages/agenda/auth/repass";
import RegisterPage from "../pages/agenda/auth/register";
import UsersPage from "../pages/agenda/admin/users";
import MedicalSpecialityPage from "../pages/agenda/admin/medical-speciality";
import DoctorsPage from "../pages/agenda/admin/doctors";
import MedicalCenterPage from "../pages/agenda/admin/medical-center";
import MedicalBuildingPage from "../pages/agenda/admin/medical-building";
import MedicalOfficePage from "../pages/agenda/admin/medical-office";
import SettingsPage from "../pages/agenda/config/settings";
import AppointmentCreatePage from "../pages/agenda/appointment/create";
import AppointmentMePage from "../pages/agenda/appointment/me";
import AppointmentReservedPage from "../pages/agenda/appointment/reserved";

type Props = {
  session: any;
};
class Routes extends Component<Props> {
  isLogged = () => {
    try {
      const sessionStr = localStorage.getItem("session");
      if (sessionStr === null) {
        return false;
      }
      const session = JSON.parse(sessionStr);
      if (!session.token) {
        return false;
      }
      const token = jwtDecode(session.token);
      const now = Math.floor(Date.now() / 1000);

      if (token.exp < now) {
        localStorage.removeItem("session");
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  PrivateRoute = ({ children, ...rest }) => {
    if (!this.isLogged()) {
      let path = window.location.pathname;
      if (window.location.search) {
        path = path + window.location.search;
      }
      localStorage.setItem("last_path", path);
    }
    return (
      <Route
        {...rest}
        render={({ location }) =>
          this.isLogged() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };

  render() {
    const PrivateRoute = this.PrivateRoute;
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/recuperar-contrasena" component={RePassPage} />
        <Route exact path="/register" component={RegisterPage} />
        <PrivateRoute exact path="/agenda" session={this.props.session}>
          <HomePage />
        </PrivateRoute>
        <PrivateRoute exact path="/agenda/perfil" session={this.props.session}>
          <ProfilePage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/agenda/admin/usuarios"
          session={this.props.session}
        >
          <UsersPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/agenda/admin/especialidades-medicas"
          session={this.props.session}
        >
          <MedicalSpecialityPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/agenda/admin/doctores"
          session={this.props.session}
        >
          <DoctorsPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/agenda/admin/centros-medicos"
          session={this.props.session}
        >
          <MedicalCenterPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/agenda/admin/edificios"
          session={this.props.session}
        >
          <MedicalBuildingPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/agenda/admin/oficinas"
          session={this.props.session}
        >
          <MedicalOfficePage />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/agenda/configuracion"
          session={this.props.session}
        >
          <SettingsPage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/agenda/reservas/crear"
          session={this.props.session}
        >
          <AppointmentCreatePage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/agenda/reservas/mis-reservas"
          session={this.props.session}
        >
          <AppointmentMePage />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/agenda/reservas/reservar"
          session={this.props.session}
        >
          <AppointmentReservedPage />
        </PrivateRoute>
        <Route exact path="/centros-medicos" component={CenterPageWeb} />
        <Route exact path="/especialidades" component={SpecialityPageWeb} />
        <Route exact path="/nosotros" component={AboutPageWeb} />
        <Route exact path="/" component={HomePageWeb} />
        <Route component={Error404Page} />
      </Switch>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { reducers } = state;
  return { session: reducers.session };
};
export default withRouter(connect(mapStateToProps)(Routes));
