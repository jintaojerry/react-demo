import React from "react";
import { Input, Icon } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as itemActions from "../../redux/action/action";
import "./bb.scss";

class Bb extends React.Component {
  constructor(props) {
    super(props);
    let { userName } = this.props.bbState;
    this.state = {
      userName: userName
    };
  }
  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: "" });
  };
  onChangeUserName = e => {
    this.setState({ userName: e.target.value });
  };
  render() {

    let { userName } = this.state;
    const suffix = userName ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;
    return (
      <Input
        placeholder="Enter your username"
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        suffix={suffix}
        value={userName}
        onChange={this.onChangeUserName}
        ref={node => (this.userNameInput = node)}
      />
    );
  }

  componentWillUnmount() {   
    let { userName } = this.state;
    let bbState = {
      userName: userName
    };
    this.props.bbAction(bbState);
  }
}

const mapStateToProps = state => {
  return {
    bbState: state.bbReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    bbAction: bindActionCreators(itemActions, dispatch).bbAction
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bb);
