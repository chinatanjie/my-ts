import React from "react";
import Particles from 'react-particles-js'
import {Button, Checkbox, Form, Input} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import  '../assets/css/login.scss'
import FormItem from "antd/es/form/FormItem";

import {withRouter} from "react-router-dom"


interface State {
  clientHeight: number;
}

class Login extends React.Component<any, State> {
  state = {clientHeight: document.documentElement.clientHeight || document.body.clientHeight};

  constructor(props: any) {
    super(props);
    this.onResize = this.onResize.bind(this);
    console.log("Login")
    console.log(props)
  }

  onResize() {
    this.setState({clientHeight: document.documentElement.clientHeight || document.body.clientHeight});
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {


    return (
        <div>
          <Particles height={this.state.clientHeight + 'px'} params={{
            background: {
              color: {
                value: "#0d47a1",
              },
            },
            fpsLimit: 60,
            interactivity: {
              detectsOn: "canvas",
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  value_area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 5,
              },
            },
            detectRetina: true,
          }}/>

          <div className="content">
            <div className="title">后台管理系统</div>
            <Form >
              <FormItem>
                {<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />}
              </FormItem>
              <FormItem>
                {<Input.Password prefix={<LockOutlined className="site-form-item-icon" />}  placeholder="密码" />}
              </FormItem>
              <Form.Item style={{marginTop:'24px',marginBottom:'24px'}}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a style={{float:'right'}} href={'/'}>
                  Forgot password
                </a>
              </Form.Item>

              <FormItem>
                <Button type="primary" htmlType="submit" block >
                  登录
                </Button>
                <div style={{ color: '#999',paddingTop:'10px',textAlign:'center' }}>Tips : 输入任意用户名密码即可</div>
              </FormItem>
            </Form>
          </div>


        </div>
    );
  }
}

export default withRouter(Login)