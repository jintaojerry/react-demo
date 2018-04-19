import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import emitter from "../../util/events";
import slideBarData from "../../api/slideBarData";
import "./slideBar.scss";

const SubMenu = Menu.SubMenu;

class SlideBar extends React.Component {
  constructor(props) {
    super(props);
    let defaultSelectedKeys = [];
    let defaultOpenKeys = [];
    let selectedKeys = [];
    let currentMenuKey = window.localStorage.getItem("currentMenuKey");
    currentMenuKey = currentMenuKey ? currentMenuKey : "monitor";
    let selectedKeyStorage = JSON.parse(
      window.localStorage.getItem("selectedKey")
    );
    if (selectedKeyStorage) {
      defaultSelectedKeys.push(selectedKeyStorage);
    } else {
      defaultSelectedKeys.push("aaaa");
    }

    if (localStorage.getItem("keyPath")) {
      defaultOpenKeys.push(localStorage.getItem("keyPath"));
    } else {
      defaultOpenKeys.push("sub1");
    }
    this.state = {
      defaultSelectedKeys: defaultSelectedKeys,
      defaultOpenKeys: defaultOpenKeys,
      selectedKeys: defaultSelectedKeys,
      currentMenuKey: currentMenuKey
    };
  }
  handleClick = e => {
    let keyPath;
    if (e.keyPath.length > 1) {
      keyPath = e.keyPath[1];
    }
    localStorage.setItem("keyPath", keyPath);
    this.props.history.push("/home/" + e.key);
  };

  componentWillReceiveProps(nextProps) {
    let pathname = nextProps.location.pathname.replace("/home/", "");
    let selectedKeys = [];
    let message = slideBarData.filter(item => {
      return item.key == pathname;
    });
    selectedKeys.push(message[0].key);
    localStorage.setItem("selectedKey", JSON.stringify(message[0].key));
    this.setState({
      ...this.state,
      selectedKeys: selectedKeys,
      currentMenuKey: message[0].currentMenu
    });
  }

  componentDidMount() {
    this.eventEmitter = emitter.addListener("changeSlideBarMenu", message => {
      this.setState({ ...this.state, currentMenuKey: message });
      switch (message) {
        case "monitor":
          this.props.history.push("/home/aaaa");
          break;
        case "recharge":
          this.props.history.push("/home/hhhh");
          break;
        case "operations":
          this.props.history.push("/home/kkkk");
          break;
        default:
          break;
      }
    });
  }
  componentWillUnmount() {
    // emitter.removeListener(this.eventEmitter);
  }
  render() {
    return (
      <div className={this.props.collapsed ? "slideBar active" : "slideBar"}>
        <Menu
          defaultSelectedKeys={this.state.defaultSelectedKeys}
          defaultOpenKeys={this.state.defaultOpenKeys}
          selectedKeys={this.state.selectedKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.props.collapsed}
          onClick={this.handleClick}
          className={
            this.state.currentMenuKey == "monitor"
              ? "sledeBarMenu"
              : "sledeBarMenu active"
          }
        >
          <Menu.Item key="aaaa" title="Option 1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="bbbb" title="Option 2">
              Option 2
            </Menu.Item>
            <Menu.Item key="cccc" title="Option 3">
              Option 3
            </Menu.Item>
            <Menu.Item key="dddd" title="Option 4">
              Option 4
            </Menu.Item>
            <Menu.Item key="eeee" title="Option 5">
              Option 5
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="ffff" title="Option 6">
              Option 6
            </Menu.Item>
            <Menu.Item key="gggg" title="Option 7">
              Option 7
            </Menu.Item>
          </SubMenu>
        </Menu>

        <Menu
          defaultSelectedKeys={this.state.defaultSelectedKeys}
          defaultOpenKeys={this.state.defaultOpenKeys}
          selectedKeys={this.state.selectedKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.props.collapsed}
          onClick={this.handleClick}
          className={
            this.state.currentMenuKey == "recharge"
              ? "sledeBarMenu"
              : "sledeBarMenu active"
          }
        >
          <Menu.Item key="hhhh" title="Option 1">
            <Icon type="pie-chart" />
            <span>Option AAA</span>
          </Menu.Item>

          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Navigation AAA</span>
              </span>
            }
          >
            <Menu.Item key="iiii" title="Option 6">
              Option BBB
            </Menu.Item>
            <Menu.Item key="jjjj" title="Option 7">
              Option CCC
            </Menu.Item>
          </SubMenu>
        </Menu>

        <Menu
          defaultSelectedKeys={this.state.defaultSelectedKeys}
          defaultOpenKeys={this.state.defaultOpenKeys}
          selectedKeys={this.state.selectedKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.props.collapsed}
          onClick={this.handleClick}
          className={
            this.state.currentMenuKey == "operations"
              ? "sledeBarMenu"
              : "sledeBarMenu active"
          }
        >
          <Menu.Item key="kkkk" title="Option 1">
            <Icon type="pie-chart" />
            <span>Option 甲</span>
          </Menu.Item>

          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>Navigation React</span>
              </span>
            }
          >
            <Menu.Item key="llll" title="Option 6">
              Option 乙
            </Menu.Item>
            <Menu.Item key="mmmm" title="Option 7">
              Option 丙
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    collapsed: state.collapsed
  };
};

export default withRouter(connect(mapStateToProps)(SlideBar));
