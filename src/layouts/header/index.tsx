import React from "react";
import {Badge, } from "antd";
import {connect} from "react-redux";
import {Dispatch} from "@/redux/data";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FullscreenOutlined,

  SettingOutlined,
  BellOutlined
} from "@ant-design/icons";
import {GlobalStateType} from "../../redux/models/global";
import BreadCrumb from "./BreadCrumb";

interface PropsType {
  theme?: string;
  dispatch: Dispatch;
  collapsed?: boolean;

}


class Index extends React.Component<PropsType, any> {

  render() {
    const {collapsed, dispatch} = this.props;
    return (<header>
      <div className={'top-header'}>
        <div className={'top-header-inner'}>
          {collapsed ? <MenuUnfoldOutlined style={{fontSize:'20px'}} onClick={() => {
            dispatch({type: 'global/setCollapsed', payload: {value: false}})

          }
          }/> : <MenuFoldOutlined style={{fontSize:'20px'}} onClick={() => {
            dispatch({type: 'global/setCollapsed', payload: {value: true}})

          }
          }/>}
          <div className={'header-title'}>
            <BreadCrumb/>
          </div>

          <div className={'header-right'}>
            <FullscreenOutlined style={{marginRight: '12px'}}/>
            <SettingOutlined style={{marginRight: '12px'}}/>
            <Badge count={5}>
              <BellOutlined/>
            </Badge>
          </div>
        </div>
      </div>
    </header>);
  }
}

export default connect(({global}: { global: GlobalStateType }) => {
  return {
    ...global
  }
})(Index);