import { Divider, Row, Col, Table, Tag, Space } from 'antd';
import React from 'react';

const style = { background: '#0092ff', padding: '8px 0' };

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
    dataIndex: 'taskStatus',
    key: 'taskStatus',
    width: '5%',
    render: (taskStatus: any) => (
      <>
        {taskStatus.map((state: string) => {
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
    title: '任务进度',
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
    taskStatus: ['ready'],
    taskProgress: '0%',
    startTime: '2021.09.11',
    endTime: '2021.09.11',
    creator: 'DDDDanny',
  },
  {
    key: '2',
    taskName: '任务2',
    taskContent: '前端测试2',
    taskStatus: ['going'],
    taskProgress: '50%',
    startTime: '2021.09.11',
    endTime: '2021.09.11',
    creator: 'DDDDanny',
  },
  {
    key: '3',
    taskName: '任务3',
    taskContent: '前端测试3',
    taskStatus: ['finish'],
    taskProgress: '100%',
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

  render() {
    return (
      <div>
        <Divider orientation="left">条件搜索</Divider>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
        <Divider orientation="left">任务表</Divider>
        <Table dataSource={data} columns={columns} />
      </div>
    );
  }
}
