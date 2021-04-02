import React from "react";
import {match} from "react-router-dom"
interface TestProps {
match:match;
}
class  Test extends React.Component<TestProps, any>{

  constructor(props: TestProps, context: any) {
    super(props, context);
    console.log(props)
  }

  render() {

    return (<div>
      test{this.props.match.params['params']}
    </div>);
  }
}

export default Test;

