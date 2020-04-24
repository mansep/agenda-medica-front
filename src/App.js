import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import * as jwtDecode from 'jwt-decode';

import HomePage from "./pages/home";
import Error404Page from "./pages/error/404";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";

function App() {
  const isLogged = () => {
    try {
      const session = JSON.parse(localStorage.getItem("session"));
      if (!session.token) {
        return false
      }
      const token = jwtDecode(session.token)

      return true;
    } catch{
      return false;
    }
  }

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLogged() ? (
            children
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
        }
      />
    );
  }

  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute path="/agenda" >
            <HomePage />
          </PrivateRoute>
          <Route component={Error404Page} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
