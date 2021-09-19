import React from 'react';
import {
  SearchOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
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
import TaskModal from './taskInfoModal';
import TaskEditModal from './taskInfoEditModal';

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
      isAddTaskModalVisible: false, // 控制新增任务的Model是否出现
      isEditTaskModalVisible: false, // 控制编辑任务Modal是否出现
      createTaskInfo: {}, // 创建任务信息
      queryStatus: false, // 判断是否查询成功
      editData: {}, // 需要编辑的数据
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
        width: '5%',
        render: (data: any) => (
          <Space size="middle">
            <a onClick={this.showAddTaskModel} style={{ color: '#99CC00' }}>
              <PlusOutlined />
            </a>
            <a
              onClick={() => {
                this.showEditTaskModel(data);
              }}
            >
              <EditOutlined />
            </a>
            <a
              onClick={() => {
                this.confirmDeleteTask(data);
              }}
              style={{ color: 'red' }}
            >
              <DeleteOutlined />
            </a>
          </Space>
        ),
      },
    ];
  }

  // 确认是否删除任务
  confirmDeleteTask(data: any) {
    // 删除前，Modal确认框配置
    Modal.confirm({
      title: '确认删除任务吗？',
      icon: <ExclamationCircleOutlined />,
      content: `将被删除的任务名称：${data.taskName}`,
      okText: '确认删除',
      okButtonProps: { danger: true },
      onOk: () => {
        this.handleDeleteTask(data.taskId);
      },
      cancelText: '取消',
    });
  }

  // 处理删除任务
  handleDeleteTask = (taskId: string) => {
    // 判断传入数据是否为空
    if (!taskId) {
      message.error(`删除失败!`);
      return;
    }
    // 调用删除任务接口
    api
      .deleteTask({ taskId })
      .then((response: any) => {
        if (response.code != 0) {
          message.error(response.msg);
          return;
        }
        message.success('删除任务成功!');
        //  删除成功后，刷新任务列表数据
        this.queryTaskList({});
      })
      .catch((error: any) => {
        message.error(`删除失败！失败原因：${error}`);
      });
  };

  // 封装查询任务列表逻辑
  queryTaskList(Params: any) {
    api
      .getTaskList(Params)
      .then((response: any) => {
        if (response.code != 0) {
          message.error(response.msg);
          this.setState({ queryStatus: false });
          return;
        }
        this.setState({ data: response.data, queryStatus: true });
      })
      .catch((error: any) => {
        message.error(`查询失败：${error}`);
        this.setState({ queryStatus: false });
      });
  }

  componentDidMount() {
    // 组件挂载完成后，调获取任务列表接口（查询所有数据）
    this.queryTaskList({});
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
    // 调用查询任务列表接口
    this.queryTaskList(Object.assign(paramsBase, paramsTime));
    // 如果查询成功，则显示Message
    if (this.state.queryStatus) {
      message.success('查询成功');
    }
  };

  // 打开新增任务Model
  showAddTaskModel = () => {
    // 保证新增和编辑只有一个Modal展示
    this.setState({ isAddTaskModalVisible: true });
    this.setState({ isEditTaskModalVisible: false });
  };

  // 打开编辑任务Model
  showEditTaskModel = (data: any) => {
    // 保证新增和编辑只有一个Modal展示
    this.setState({ isEditTaskModalVisible: true });
    this.setState({ isAddTaskModalVisible: false });
    this.setState({ editData: data });
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
        this.setState({ isAddTaskModalVisible: false });
        // 调用查询任务列表接口,刷新列表信息
        this.queryTaskList({});
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
        <TaskModal
          title="新增任务"
          isModalVisible={this.state.isAddTaskModalVisible}
          onFinish={(values: any) => this.handleSubmitAddTask(values)}
        />
        <TaskEditModal
          title="编辑任务"
          isModalVisible={this.state.isEditTaskModalVisible}
          editData={this.state.editData}
          onFinish={(values: any) => this.handleSubmitAddTask(values)}
        />
      </div>
    );
  }
}
