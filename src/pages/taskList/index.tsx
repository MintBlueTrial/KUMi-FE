import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {
  Divider,
  Row,
  Col,
  Table,
  Tag,
  Space,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Progress,
} from 'antd';
import { KumiApi } from '@/models';

const { RangePicker } = DatePicker;
const { Option } = Select;

// 测试数据
const columns = [
  { title: '任务名称', dataIndex: 'taskName', key: 'taskName', width: '15%' },
  {
    title: '任务内容',
    dataIndex: 'taskContent',
    key: 'taskContent',
    width: '25%',
  },
  {
    title: '任务状态',
    dataIndex: 'taskStatus',
    key: 'taskStatus',
    width: '5%',
    render: (taskStatus: any) => {
      let color = '#0099CC';
      if (taskStatus === 'finish') {
        color = '#99CC66';
      } else if (taskStatus === 'going') {
        color = '#FF9900';
      }
      return (
        <Tag color={color} key={taskStatus}>
          {taskStatus.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: '完成进度',
    dataIndex: 'taskPrograss',
    key: 'taskPrograss',
    width: '10%',
    render: (taskPrograss: any) => {
      let color = '#99CC66';
      if (taskPrograss < 100) {
        color = '#FF9900';
      }
      return (
        <Progress percent={taskPrograss} strokeColor={color} size="small" />
      );
    },
  },
  { title: '开始时间', dataIndex: 'beginTime', key: 'beginTime', width: '15%' },
  {
    title: '结束时间',
    dataIndex: 'finishTime',
    key: 'finishTime',
    width: '15%',
  },
  { title: '创建人', dataIndex: 'creator', key: 'creator' },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>新增</a>
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

// 实例化KumiApi
const api = new KumiApi();

export default class TaskList extends React.Component<any, any> {
  // 构造函数
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // 组件挂载完成后，调获取任务列表接口
    api.getTaskList().then((response: any) => {
      this.setState({ data: response.data });
    });
  }

  onFinish = (values: any) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <div>
        <Divider orientation="left">查 询</Divider>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
        >
          <Row justify="space-around">
            <Col span="6">
              <Form.Item label="任务名称" name="taskName">
                <Input placeholder="请输入任务名称" allowClear />
              </Form.Item>
            </Col>
            <Col span="6">
              <Form.Item label="任务状态" name="taskState">
                <Select placeholder="请选择任务状态" allowClear>
                  <Option value="finish">已完成</Option>
                  <Option value="going">进行中</Option>
                  <Option value="ready">未开始</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span="6">
              <Form.Item label="执行时间" name="taskTime">
                <RangePicker
                  showTime
                  allowClear
                  placeholder={['任务开始时间', '任务结束时间']}
                />
              </Form.Item>
            </Col>
            <Col span="1">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  icon={<SearchOutlined />}
                >
                  搜索
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Divider orientation="left">任务表</Divider>
        <Table dataSource={this.state.data} columns={columns} bordered />
      </div>
    );
  }
}
