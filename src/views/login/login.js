import React from "react";
import {message} from 'antd';
import { withRouter } from "react-router-dom";
import './login.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '', 
      password: '', 
    };
  }

  handleUsernameInput = (e) => {
    this.setState({...this.state,username: e.target.value});
  };

  handlePasswordInput = (e) => {
    this.setState({...this.state,password: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();  
    const username = this.state.username
    const password = this.state.password
    if(username == 'admin' && password == '123456') {
      message.success('登录成功');
      setTimeout(() => {
        this.props.history.push('/home')
      }, 500);
    }else{
      message.error(`登录失败: 用户名或密码错误`);
    }
   
  }



  render() {
    return (
      <div id="loginDIV">
        <div className="login">
          <h1>SJCX后台管理</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="login-input"
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameInput}
              placeholder="用户名"
              required="required"
            />
            <input
              className="login-input"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordInput}
              placeholder="密码"
              required="required"
            />
            <button
              className="btn btn-primary btn-block btn-large"
              type="submit"
            >
              登录
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
