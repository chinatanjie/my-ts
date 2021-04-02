import React from "react";
import {Layout} from "antd";
import {Switch, Route,Redirect} from "react-router-dom"
import menus from "@/router/menu"
import {MenuConfigType} from "../../router/data";

const handleRoutes = (m: MenuConfigType[], path: string) => {

  m.forEach(v => {

    const pathPrefix: string = v.path[0] === '/' ? v.path : (path + '/' + v.path);
    if (v.component) {
      routes.push({
        path: pathPrefix,
        title: v.title,
        component: v.component,
        permission: v.permission,
      })
    }
    if (v.children) {
      handleRoutes(v.children, pathPrefix);
    }
  });

}


const routes: Array<MenuConfigType> = [];
handleRoutes(menus, '/')
// console.log(routes)

class Index extends React.Component<any, any> {

  handleFilter = (permission: boolean) => {
    return true;
  }

  render() {
    return (
        <Layout.Content className={'mainContent'}>

          < Switch>
            {routes.map(e => {
              return this.handleFilter(e.permission || true) &&
                  <Route path={e.path} key={e.path} component={e.component}/>
            })}
            <Redirect to={'/error/404'} />
          </Switch>
        </Layout.Content>
    );
  }
}

export default Index;