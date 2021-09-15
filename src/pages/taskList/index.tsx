import React from 'react';
import { SearchOutlined, CheckOutlined, UndoOutlined } from '@ant-design/icons';
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
  message,
  Modal,
} from 'antd';
import { KumiApi } from '@/models';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

// 实例化KumiApi
const api = new KumiApi();

export default class TaskList extends React.Component<any, any> {
  // 声明行数据
  public columns: any;

  // 构造函数
  constructor(props: any) {
    super(props);
    this.state = {
      data: [], // 表格数据
      isModalVisible: false, // 控制新增任务的Model是否出现
      createTaskInfo: {},
    };
    // 测试数据
    this.columns = [
      {
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName',
        width: '15%',
      },
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
      {
        title: '开始时间',
        dataIndex: 'beginTime',
        key: 'beginTime',
        width: '15%',
      },
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
            <a onClick={this.showAddTaskModel}>新增</a>
            <a>编辑</a>
            <a>删除</a>
          </Space>
        ),
      },
    ];
  }

  componentDidMount() {
    // 组件挂载完成后，调获取任务列表接口
    api.getTaskList({}).then((response: any) => {
      this.setState({ data: response.data });
    });
  }

  // 提交搜索表单
  onFinish = (values: any) => {
    // 构造参数（基本）
    const paramsBase = {
      taskName: values.taskName == '' ? undefined : values.taskName,
      taskStatus: values.taskStatus == '' ? undefined : values.taskStatus,
    };
    // 构造参数（时间）
    var paramsTime = {};
    if (values.taskTime == undefined) {
      paramsTime = {
        beginTime: undefined,
        finishTime: undefined,
      };
    } else {
      paramsTime = {
        beginTime: values.taskTime[0].valueOf(),
        finishTime: values.taskTime[1].valueOf(),
      };
    }
    api
      .getTaskList(Object.assign(paramsBase, paramsTime))
      .then((response: any) => {
        this.setState({ data: response.data });
        message.success('查询成功');
      });
  };

  // 打开新增任务Model
  showAddTaskModel = () => {
    this.setState({ isModalVisible: true });
  };

  // 点击取消，关闭新增任务Model
  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  // 提交新增任务表单
  handleSubmitAddTask = (values: any) => {
    // 构建
    this.setState({
      createTaskInfo: {
        taskName: values.taskName,
        taskContent: values.taskContent,
        taskStatus: values.taskStatus,
        taskPrograss: Number(values.taskProgress),
        beginTime: values.taskTime[0].valueOf(),
        finishTime: values.taskTime[1].valueOf(),
      },
    });
    // 调用创建任务接口
    api
      .createTask(this.state.createTaskInfo)
      .then((response: any) => {
        // 当请求成功但是后端处理失败时，打印错误信息
        if (response.code != 0) {
          message.error(response.msg);
          return;
        }
        // 新增成功提示信息
        message.success('新增任务成功');
        // 关闭Model
        this.setState({ isModalVisible: false });
        // 刷新列表信息
        api.getTaskList({}).then((response: any) => {
          this.setState({ data: response.data });
        });
      })
      .catch((error: any) => {
        message.success(`新增失败：${error}`);
      })
      .finally(() => {
        // 清空新增任务的表单数据
        this.setState({ createTaskInfo: {} });
      });
  };

  render() {
    return (
      <div>
        <Divider orientation="left">查 询</Divider>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          autoComplete="off"
        >
          <Row justify="space-around">
            <Col span="6">
              <Form.Item label="任务名称" name="taskName">
                <Input placeholder="请输入任务名称" allowClear />
              </Form.Item>
            </Col>
            <Col span="6">
              <Form.Item label="任务状态" name="taskStatus">
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
        <Table
          dataSource={this.state.data}
          columns={this.columns}
          rowKey={(columns) => columns._id}
          pagination={{
            pageSize: 10,
          }}
          bordered
        />
        <Modal
          title="新增任务"
          width={600}
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          destroyOnClose
          maskClosable={false}
          footer={null}
          key={666}
        >
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={this.handleSubmitAddTask}
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
                showTime
                allowClear
                placeholder={['任务开始时间', '任务结束时间']}
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
      </div>
    );
  }
}
