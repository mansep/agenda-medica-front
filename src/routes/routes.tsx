import React, { Component } from "react";
import * as jwtDecode from "jwt-decode";
import { connect } from "react-redux";

import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import HomePage from "../pages/home";
import ProfilePage from "../pages/profile";
import Error404Page from "../pages/error/404";
import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/logout";
import RegisterPage from "../pages/auth/register";
import UsersPage from "../pages/admin/users";
import MedicalSpecialityPage from "../pages/admin/medical-speciality";
import DoctorsPage from "../pages/admin/doctors";
import MedicalCenterPage from "../pages/admin/medical-center";
import MedicalBuildingPage from "../pages/admin/medical-building";
import MedicalOfficePage from "../pages/admin/medical-office";
import SettingsPage from "../pages/config/settings";
import AppointmentCreatePage from "../pages/appointment/create";
import AppointmentMePage from "../pages/appointment/me";
import AppointmentReservedPage from "../pages/appointment/reserved";

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
