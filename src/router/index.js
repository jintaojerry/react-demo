import React from "react";
import {BrowserRouter,Route,Switch,Redirect}from 'react-router-dom';
import asyncComponent from '../util/asyncComponent'


const Login = asyncComponent(() => import("../views/login/login"));
const HomePage = asyncComponent(() => import("../views/home/home"));

// import Login from "../views/login/login";
// import HomePage from "../views/home/home";


class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route  path="/home"  component={HomePage} />
          <Route path="/login" component={Login} />
          <Redirect from="/" to="/home"></Redirect>   
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;



