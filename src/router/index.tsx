import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../layouts"


export default class Router extends React.Component<any, any>{
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route component={Login} exact path={'/login'}/>
            <Route component={Layout} path={'/'}/>
          </Switch>
        </BrowserRouter>
    );
  }
}