import React from "react";
import { Table, Button, Modal, message, Form } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { downLoadExcel } from "../../util/downLoadExcel";
import AddForm from "./addForm";
import * as itemActions from "../../redux/action/action";
import "./aa.scss";

let columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 150
  },
  {
    title: "Age",
    dataIndex: "age",
    width: 150
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];

class Aa extends React.Component {
  constructor(props) {
    super(props);
    let data = this.props.aaState.data;
    this.state = {
      addFormVisible: false,
      data: data,
      y: 0,
      clickKey: ""
    };
  }

  changePagination = e => {
    this.currentPageIndex = e;
  };

  showAddModal = () => {
    this.setState({
      addFormVisible: true
    });
  };
  addFormOk = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = this.state.data;
        data.push(Object.assign({}, { key: data.length + 1 }, values));
        this.props.form.resetFields();
        this.setState({
          addFormVisible: false,
          data: data
        });
        message.success("添加成功！");
      }
    });
  };
  addFormCancel = e => {
    this.props.form.resetFields();
    this.setState({
      addFormVisible: false
    });
  };

  printTable = e => {
    var headHtml = window.document.head.innerHTML;
    var printHtml = document.getElementById("aa-table").innerHTML;
    var wind = window.open(
      "",
      "newwindow",
      "height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no"
    );
    wind.document.head.innerHTML = headHtml;
    wind.document.body.innerHTML = printHtml;
    wind.print();
  };

  downloadFile = e => {
    let data = [
      {
        name: "Name",
        age: "Age",
        address: "Address"
      }
    ];
    let rs = data.concat(this.state.data);
    let dom = document.getElementById("downlink");
    downLoadExcel(rs, "菜单", dom);
  };

  componentDidMount() {
    let y = this.refs.aa.offsetHeight - 160;
    this.setState({
      y: y
    });
    if (!this.state.data) {
      const data = [];
      for (let i = 0; i < 250; i++) {
        data.push({
          key: i,
          name: `Edward King ${i}`,
          age: 32,
          address: `London, Park Lane no. ${i}`
        });
      }
      this.setState({
        data: data
      });
    }
  }

  render() {
    let { defaultCurrent } = this.props.aaState.pagination;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="aa" ref="aa">
        <div className="operate">
          <AddForm
            visible={this.state.addFormVisible}
            onCancel={this.addFormCancel}
            onOk={this.addFormOk}
            showModal={this.showAddModal}
            getFieldDecorator={getFieldDecorator}
          />
          <Button
            type="primary"
            onClick={this.downloadFile}
            style={{ marginRight: 15 }}
          >
            导出
          </Button>
          <a id="downlink" />
          <Button type="primary" onClick={this.printTable}>
            打印
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.data}
          pagination={{
            pageSize: 50,
            defaultCurrent: defaultCurrent,
            onChange: this.changePagination
          }}
          onRow={(record, index) => {
            return {
              onClick: e => {
                this.setState({ clickKey: record.key });
              } 
            };
          }}
          rowClassName={(record, index) => {
            if (this.state.clickKey === record.key) {
              return "rowActive";
            }
          }}
          scroll={{ y: this.state.y }}
          id="aa-table"
        />
      </div>
    );
  }

  componentWillUnmount() {
    let data = this.state.data;
    let aaState = {
      pagination: {
        defaultCurrent: this.currentPageIndex
      },
      data: data
    };

    this.props.aaAction(aaState);
  }
}

const mapStateToProps = state => {
  return {
    aaState: state.aaReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    aaAction: bindActionCreators(itemActions, dispatch).aaAction
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Aa));
