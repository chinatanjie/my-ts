import React from "react";
import {} from "@ant-design/icons"

interface FullScreenState {
  isFullScreen: boolean;
}

class FullScreen extends React.Component<any, FullScreenState> {
  state = {
    isFullScreen: false,
  }
  componentDidMount() {
  }
  componentWillUnmount() {

  }
}

export default FullScreen;