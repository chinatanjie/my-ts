import {Button, Col, Row} from "antd";
import React from "react";
import {connect} from "react-redux";
import { RouteComponentProps} from "react-router-dom"
interface PropsType extends RouteComponentProps {

}
class Error404 extends React.Component<PropsType, any>{
  goBack = () => {
    this.props.history.push('/home');
  };
  render() {
    return (
     <div>
       <h1>404</h1>
       <p>抱歉，你访问的页面不存在</p>
       <div>
         <Button onClick={this.goBack} type="primary">
           返回首页
         </Button>
       </div>
     </div>


    );
  }
}

export default connect((state)=>state)( Error404);