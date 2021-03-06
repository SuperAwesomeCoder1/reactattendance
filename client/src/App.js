import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App/dashboard/resources/style.css";
import Home from "./App/pages/landing";
import Loading from "./App/dashboard/components/misc/loading";
import Dashboard from "./App/dashboard/dashboard";
import NinjaSignup from "./App/dashboard/signups/ninja-signup";
import Ninjas from "./App/dashboard/userLists/ninjas";
import Mentors from "./App/dashboard/userLists/mentors";
import Guardians from "./App/dashboard/userLists/guardians";
import MyNinjas from "./App/dashboard/userLists/myninjas";
import Profile from "./App/dashboard/profile";
import UserView from "./App/dashboard/userview";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    );
  }
}

function authorized() {
  if (sessionStorage.getItem("id") === null) {
    return false;
  } else {
    return true;
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authorized() ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const Content = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/loading" component={Loading} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/ninjasignup" component={NinjaSignup} />
    <PrivateRoute exact path="/ninjas" component={Ninjas} />
    <PrivateRoute exact path="/mentors" component={Mentors} />
    <PrivateRoute exact path="/guardians" component={Guardians} />
    <PrivateRoute exact path="/myninjas" component={MyNinjas} />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute path="/user/:id" component={UserView} />
  </Switch>
);
export default App;
