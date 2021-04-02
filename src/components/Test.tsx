import React from "react";
interface Interfaced {
  a:string;
}
class Test extends React.Component<Interfaced, any>{


  render() {
    return (
        <div>
          {this.props.a}
          测试中
        </div>
    );
  }
}

export default Test;