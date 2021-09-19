import '../styles/index.less';
import styles from '../styles/layout.less';

import React from 'react';
import {
  PieChartOutlined,
  BarsOutlined,
  HomeOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, Avatar, Badge, message } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

// 菜单项
const menuItems = [
  {
    key: 'taskBoard',
    itemName: '任务看板',
    icon: <PieChartOutlined />,
    path: '/board',
  },
  {
    key: 'taskList',
    itemName: '任务列表',
    icon: <BarsOutlined />,
    path: '/list',
  },
];

export default class LayoutBase extends React.Component<any, any> {
  // 构造函数
  constructor(props: any) {
    super(props);
    this.state = {
      menuPos: '看板',
    };
    // 配置message
    message.config({
      duration: 2,
      maxCount: 3,
      top: 70,
    });
  }

  // 切换菜单
  switchMenuItem = (item: any) => {
    // 控制面包屑
    this.setState({ menuPos: item.key == 'taskBoard' ? '看板' : '列表' });
  };

  render() {
    return (
      <Layout className={styles.layout_full}>
        <Header
          style={{ background: 'rgb(33,42,68)' }}
          className={styles.header}
        >
          <div className={styles.logo}></div>
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={this.switchMenuItem}
            defaultSelectedKeys={['taskList']}
            style={{
              background: 'rgb(33,42,68)',
              width: '50%',
              display: 'inline-block',
            }}
          >
            {menuItems.map((item) => {
              return (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.path}>{item.itemName}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
          <span style={{ marginLeft: 30, float: 'right' }}>
            <Avatar
              style={{ backgroundColor: '#87d068' }}
              icon={<UserOutlined />}
            />
          </span>
          <span style={{ marginLeft: 30, float: 'right' }}>
            <Badge dot>
              <Avatar
                style={{ backgroundColor: '#FFCC00' }}
                icon={<BellOutlined />}
              />
            </Badge>
          </span>
        </Header>
        <Content style={{ padding: '65px 50px 0 50px', height: '100%' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{<HomeOutlined />}</Breadcrumb.Item>
            <Breadcrumb.Item>任务</Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.menuPos}</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.site}>{this.props.children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }} className={styles.footer}>
          MintBlue Design ©2021 Created by DDDDanny
        </Footer>
      </Layout>
    );
  }
}
