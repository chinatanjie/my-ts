import React from "react";
import {Layout} from "antd";
import SideMenu from "./sideMenu"
import Header from "./header"
import Content from "./content"
import Footer from "./footer"
import "@/assets/css/layout.scss"


class Index extends React.Component<any, any> {


  render() {
    return (
        <div>
          <Layout style={{minHeight: '100vh'}}>
            <SideMenu/>
            <Layout>
              <Header></Header>
              <Content></Content>
              <Footer></Footer>


            </Layout>
          </Layout>
        </div>
    );
  }
}

export default Index