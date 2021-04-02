import {MenuConfigType} from "../../router/data";
import menus from "../../router/menu";
import React from "react";
import {withRouter, RouteComponentProps} from "react-router-dom"
import {Breadcrumb} from "antd"
import AllIcon from "@/assets/icon/all";
import Icon from "@ant-design/icons";

const {Item} = Breadcrumb;

// const handleRoutes = (m: MenuConfigType[]): Route[] => {
//   return m.map(v => {
//     if (v.children) {
//       return {
//         path: v.path,
//         breadcrumbName: v.title,
//         children: handleRoutes(v.children)
//       }
//     } else {
//       return {
//         path: v.path,
//         breadcrumbName: v.title,
//       }
//     }
//
//   });
// }


interface BreadCrumbItemArray {
  [key: string]: React.ReactNodeArray;
}

const handleBreadcrumbItems = (m: MenuConfigType[], path: string, b: React.ReactNodeArray) => {

  m.forEach((v, i, c) => {
    const IconD = v.icon ? <Icon component={AllIcon[v.icon]}/> : null;
    const pathPrefix: string = v.path[0] === '/' ? v.path : (path + '/' + v.path);
    let bx = b.concat((<Item key={pathPrefix}>{IconD}<span>{v.title}</span></Item>))
    if (v.children) {
      handleBreadcrumbItems(v.children, pathPrefix, bx);
    } else {
      routeItems[pathPrefix] = bx;

    }

  });

}

const routeItems: BreadCrumbItemArray = {};
// const routes: Route[] = handleRoutes(menus);

handleBreadcrumbItems(menus, '/', []);


interface PropsType extends RouteComponentProps {

}


class BreadCrumb extends React.Component<PropsType, any> {


  render() {
    const {location} = this.props;
    return (<Breadcrumb>{routeItems[location.pathname]}</Breadcrumb>);
  }
}

export default withRouter(BreadCrumb)
