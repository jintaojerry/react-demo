import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import asyncComponent from '../util/asyncComponent'

const Aa = asyncComponent(() => import("../views/aa/aa"));
const Bb = asyncComponent(() => import("../views/bb/bb"));
const Cc = asyncComponent(() => import("../views/cc/cc"));

// import Aa from "../views/aa/aa";
// import Bb from "../views/bb/bb";
// import Cc from "../views/cc/cc";

class ChildRoute extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/home/aaaa" component={Aa} />
        <Route path="/home/bbbb" component={Bb} />
        <Route path="/home/:id" component={Cc} />
        <Redirect from="/home/" to="/home/aaaa" />
      </Switch>
    );
  }
}
export default ChildRoute;
