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
} from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

// 测试数据
const columns = [
  { title: '任务名称', dataIndex: 'taskName', key: 'taskName', width: '20%' },
  {
    title: '任务内容',
    dataIndex: 'taskContent',
    key: 'taskContent',
    width: '30%',
  },
  {
    title: '任务状态',
    dataIndex: 'taskState',
    key: 'taskState',
    width: '5%',
    render: (taskState: any) => (
      <>
        {taskState.map((state: string) => {
          let color = '#0099CC';
          if (state === 'finish') {
            color = '#99CC66';
          } else if (state === 'going') {
            color = '#FF9900';
          }
          return (
            <Tag color={color} key={state}>
              {state.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '进度',
    dataIndex: 'taskProgress',
    key: 'taskProgress',
    width: '5%',
  },
  { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
  { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
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

// 测试数据
const data = [
  {
    key: '1',
    taskName: '任务1',
    taskContent: '前端测试1',
    taskState: ['ready'],
    taskProgress: 0,
    startTime: '2021.09.11',
    endTime: '2021.09.11',
    creator: 'DDDDanny',
  },
  {
    key: '2',
    taskName: '任务2',
    taskContent: '前端测试2',
    taskState: ['going'],
    taskProgress: 50,
    startTime: '2021.09.11',
    endTime: '2021.09.11',
    creator: 'DDDDanny',
  },
  {
    key: '3',
    taskName: '任务3',
    taskContent: '前端测试3',
    taskState: ['finish'],
    taskProgress: 100,
    startTime: '2021.09.11',
    endTime: '2021.09.11',
    creator: 'DDDDanny',
  },
];

export default class TaskList extends React.Component<any, any> {
  // 构造函数
  constructor(props: any) {
    super(props);
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
        <Table dataSource={data} columns={columns} bordered />
      </div>
    );
  }
}
