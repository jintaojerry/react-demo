import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as itemActions from "../../redux/action/action";
import { Tabs, Button, message } from "antd";
import slideBarData from "../../api/slideBarData";
import "./tab.scss";
const TabPane = Tabs.TabPane;

class Tab extends React.Component {
  constructor(props) {
    super(props);
    let panes = [{ title: "首页", key: "aaaa", closable: false }];
    let activeKey = "aaaa";
    let selectedKeyStorage = JSON.parse(
      window.localStorage.getItem("selectedKey")
    );
    let selectedPane = slideBarData.filter(item => {
      return item.key == selectedKeyStorage;
    });
    if (selectedKeyStorage) {
      if (selectedKeyStorage != "aaaa") {
        panes.push(selectedPane[0]);
        activeKey = selectedKeyStorage;
      }
    }

    this.state = {
      activeKey: activeKey,
      panes
    };
  }

  onChange = activeKey => {
    this.props.history.push("/home/" + activeKey);
  };
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };
  remove = targetKey => {
    let activeKey = this.state.activeKey;
    if (targetKey == "aaaa") {
      message.warn("当前页面无法关闭哦!");
      return;
    }
    if (targetKey == "bbbb") {
      setTimeout(() => {
        this.props.actions.bbAction({
          userName: ''
        })
      }, 100);
    }


    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
      this.props.history.push("/home/" + activeKey);
    }

    this.setState({ panes, activeKey });
  };
  render() {
    return (
      <div className="tab">
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
          tabBarGutter={0}
        >
          {this.state.panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    let pathname = nextProps.location.pathname.replace("/home/", "");
    let message = slideBarData.filter(item => {
      return item.key == pathname;
    });
    message = message[0];
    const panes = this.state.panes;
    const isExistPane = panes.some(item => {
      return item.key === message.key;
    });
    if (!isExistPane) {
      panes.push(message);
      this.setState({ panes });
    }
    this.setState({
      activeKey: message.key
    });
  }
}

const mapStateToProps = state => {
  return {
    aaState: state.aaReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(itemActions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tab));
