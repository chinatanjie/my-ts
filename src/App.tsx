import './App.css'

import React from "react";
// import {hot} from "react-hot-loader/root";

import {Provider} from "react-redux";
import {start} from "./redux/root";
import Router from "./router";
import "./assets/icon"

class App extends React.Component<any> {

  render() {
    return (
        <Provider store={start()}>

            <Router/>

        </Provider>
    );
  }
}

// export default hot(App);
export default App;
