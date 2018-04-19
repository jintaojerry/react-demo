import React from "react";
import { Modal, Button, Form, Input } from "antd";
const FormItem = Form.Item;

class AddForm extends React.Component {
  render() {
    const {
      visible,
      onOk,
      onCancel,
      getFieldDecorator,
      showModal
    } = this.props;
    return (
      <div style={{ marginRight: 15,marginLeft:15 }}>
        <Button type="primary" onClick={showModal}>
          新增
        </Button>
        <Modal
          title="新增用户"
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          okText="提交"
          cancelText="取消"
        >
          <div className="model">
            <FormItem label={`Name`}>
              {getFieldDecorator(`name`, {
                rules: [
                  {
                    required: true,
                    message: "please input name"
                  }
                ]
              })(<Input placeholder="please input name" />)}
            </FormItem>
            <FormItem label={`Age`}>
              {getFieldDecorator(`age`, {
                rules: [
                  {
                    required: true,
                    message: "please input age"
                  }
                ]
              })(<Input placeholder="please input age" />)}
            </FormItem>
            <FormItem label={`Address`}>
              {getFieldDecorator(`address`, {
                rules: [
                  {
                    required: true,
                    message: "please input address"
                  }
                ]
              })(<Input placeholder="please input address" />)}
            </FormItem>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddForm;
