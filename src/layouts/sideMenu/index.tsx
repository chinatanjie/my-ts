import React from "react";
import {Layout, Menu,} from "antd";
import {connect} from "react-redux";
import {MenuConfigType} from "../../router/data";
import menus from "../../router/menu";
import AllIcon from "@/assets/icon/all";
import Icon from "@ant-design/icons";
import {Link} from "react-router-dom";
import  {GlobalStateType} from "../../redux/models/global";
import {SiderTheme} from "antd/lib/layout/Sider";
import {Dispatch} from "redux";
import {withRouter, RouteComponentProps} from "react-router-dom"


const {SubMenu, Item} = Menu;

interface PropsType extends RouteComponentProps{
  theme?: string;
  dispatch: Dispatch<any>;
  collapsed?:boolean;

}

class Index extends React.Component<PropsType, any> {

  constructor(props: Readonly<PropsType> | PropsType) {
    super(props);
    let strings = props.location.pathname.split('/');
    // console.log(props.location.pathname)
    // console.log(strings)
    this.defaultSelectedKeys.push(props.location.pathname);
    strings.forEach((v,i) => {
      if(i==1){
        this.defaultOpenKeys.push('/'+v)
      }else if(i<(strings.length-1) && i>1){
        this.defaultOpenKeys.push(this.defaultOpenKeys[this.defaultOpenKeys.length-1]+'/'+v)
      }

    })

    // console.log(this.defaultOpenKeys)
    // console.log(this.defaultSelectedKeys)
  }
  private defaultOpenKeys:string[]=[];
  private defaultSelectedKeys:string[]=[];

  handleFilter = (permission: boolean) => {
    return true;
  }


  renderMenu = (data: MenuConfigType[],path:string) => {
    return data.map(item => {
      const IconD = item.icon ? <Icon component={AllIcon[item.icon]}/> : null;
      const pathPrefix:string=item.path[0]==='/'?item.path:(path+'/'+item.path);
      // console.log(pathPrefix)
      if (item.children) {
        return (this.handleFilter(item.permission || true) && item.title&&(
            <SubMenu key={pathPrefix} title={item.title} icon={IconD}>
              {this.renderMenu(item.children,pathPrefix)}
            </SubMenu>
        ))
      } else {
        return (this.handleFilter(item.permission || true) && item.title&&(
            <Item key={pathPrefix} title={item.title}
                  icon={IconD}>
              <Link to={pathPrefix}>
                {item.title}
              </Link>

            </Item>
        ))
      }
    })

  }

  render() {
    let {collapsed,theme,dispatch} = this.props;

    return (
        <Layout.Sider theme={theme as SiderTheme ||'dark'} width={'220px'} collapsed={collapsed} breakpoint={'md'}
        onBreakpoint={broken => {
          // console.log(broken)
          dispatch({type: 'global/setCollapsed', payload: {value: broken}});
        }} >
          <div style={{color:'white',fontSize:'36px',textAlign:"center"}}>
            Logo
          </div>
          <Menu
              defaultSelectedKeys={this.defaultSelectedKeys}
              defaultOpenKeys={this.defaultOpenKeys}
              theme={'dark'}
              mode="inline"
          >
            {this.renderMenu(menus,"/")}
          </Menu>
        </Layout.Sider>
    );
  }
}

export default connect(({global}:{global:GlobalStateType})=>{
  return {
      ...global
  }
})(withRouter(Index));