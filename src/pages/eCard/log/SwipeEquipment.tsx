import React from "react";
import Swipe, {StateType, SwipeProps} from "@/pages/eCard/log/swipe";
import {connect} from "react-redux";
import Model from "./models/SwipeDoor";

const namespace=Model.namespace;
const title: string = '设备刷卡历史记录查询';
const subTitle: string = '设备刷卡历史记录以及相关持人的信息综合查询';

class SwipeEquipment extends React.Component<SwipeProps, any> {

  constructor(props: SwipeProps, context: any) {
    super(props, context);
  }

  render() {
    return (<div ><Swipe {...this.props} name={namespace}/></div>);
  }
}

export default connect(
    (
        state: any) => {
      return {
        ...state[namespace],

      }
    }
)
(SwipeEquipment);
