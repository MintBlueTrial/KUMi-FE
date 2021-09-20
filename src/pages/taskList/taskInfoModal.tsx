import React from 'react';

import { CheckOutlined, UndoOutlined } from '@ant-design/icons';
import {
  Divider,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Modal,
  DatePicker,
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

export default class TaskModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalVisible: false, // 控制Modal是否显示
    };
  }

  // 监听isModalVisible变化，保证同步
  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.isModalVisible !== this.props.isModalVisible) {
      this.setState({ isModalVisible: this.props.isModalVisible });
    }
  }

  // 点击取消，关闭新增任务Model
  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    return (
      <Modal
        title={this.props.title}
        visible={this.state.isModalVisible}
        onCancel={this.handleCancel}
        maskClosable={false}
        footer={null}
        width={600}
        key={666}
        destroyOnClose
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={(values: any) => this.props.onFinish(values)}
        >
          <Form.Item
            label="任务名称"
            name="taskName"
            rules={[{ required: true, message: '请输入任务名称！' }]}
          >
            <Input placeholder="请输入任务名称" allowClear />
          </Form.Item>
          <Form.Item
            label="任务内容"
            name="taskContent"
            rules={[{ required: true, message: '请输入任务内容！' }]}
          >
            <TextArea
              showCount
              maxLength={200}
              rows={3}
              placeholder="请输入任务内容"
              allowClear
            />
          </Form.Item>
          <Form.Item
            label="任务状态"
            name="taskStatus"
            rules={[{ required: true, message: '请选择任务状态！' }]}
          >
            <Select placeholder="请选择任务状态" allowClear>
              <Option value="finish">已完成</Option>
              <Option value="going">进行中</Option>
              <Option value="ready">未开始</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="执行时间"
            name="taskTime"
            rules={[{ required: true, message: '请输入任务执行时间！' }]}
          >
            <RangePicker
              allowClear
              placeholder={['任务开始时间', '任务结束时间']}
              style={{ width: 370 }}
            />
          </Form.Item>
          <Form.Item
            label="任务进度"
            name="taskProgress"
            rules={[{ required: true, message: '请输入任务进度！' }]}
          >
            <Input placeholder="请输入任务进度" allowClear suffix="%" />
          </Form.Item>
          <Divider />
          <Row justify="center" gutter={[16, 8]}>
            <Col span="6">
              <Form.Item>
                <Button
                  icon={<CheckOutlined />}
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  style={{ width: 100 }}
                >
                  确 定
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  icon={<UndoOutlined />}
                  shape="round"
                  style={{ width: 100 }}
                  onClick={this.handleCancel}
                >
                  取 消
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
