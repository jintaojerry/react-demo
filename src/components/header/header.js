import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as itemActions from "../../redux/action/action";
import { Button, Icon, Menu, Dropdown, message } from "antd";
import emitter from "../../util/events";
import slideBarData from "../../api/slideBarData";
import "./header.scss";
import logo from "../../assets/images/logo.png";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component {
  constructor(props) {
    super(props);
    let currentMenu = window.localStorage.getItem("currentMenuKey");
    this.state = {
      currentMenu: currentMenu ? currentMenu : "monitor"
    };
    this.userInfoMenu = (
      <Menu onClick={this.dropDownClick}>
        <Menu.Item key="1">
          <a>我的信息</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a>修改密码</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">退出登录</Menu.Item>
      </Menu>
    );
  }

  handleClick = e => {
    this.changeSlideBarMenu(e.key);
  };

  changeSlideBarMenu = message => {
    emitter.emit("changeSlideBarMenu", message);
  };

  dropDownClick = e => {
    switch (e.key) {
      case "1":
        message.info("此模块正在开发中...");
        break;
      case "2":
        message.info("此模块正在开发中...");
        break;
      case "3":
        this.props.history.push('/login')
        break;
      default:
        break;
    }
  };

  componentWillReceiveProps(nextProps) {
    let pathname = nextProps.location.pathname.replace("/home/", "");
    let message = slideBarData.filter(item => {
      return item.key == pathname;
    });
    let currentMenu = message[0].currentMenu;
    if (this.state.currentMenu != currentMenu) {
      this.setState({
        currentMenu: message[0].currentMenu
      });
      window.localStorage.setItem("currentMenuKey", currentMenu);
    }
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h3>管理系统</h3>
        </div>
        <Button onClick={this.props.toggleCollapsed} className="toggle">
          <Icon type={this.props.collapsed ? "menu-unfold" : "menu-fold"} />
        </Button>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.currentMenu]}
          mode="horizontal"
        >
          <Menu.Item key="monitor">
            <Icon type="home" />监控中心
          </Menu.Item>
          <Menu.Item key="recharge">
            <Icon type="appstore" />充值管理
          </Menu.Item>
          <Menu.Item key="operations">
            <Icon type="cloud" />运维管理
          </Menu.Item>
        </Menu>
        <Dropdown overlay={this.userInfoMenu} trigger={["click"]}>
          <a className="ant-dropdown-link" href="#">
            <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" />
            <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    collapsed: state.collapsed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCollapsed: bindActionCreators(itemActions, dispatch).toggleCollapsed
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
