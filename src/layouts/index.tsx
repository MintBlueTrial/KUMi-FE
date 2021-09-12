import React from 'react';
import styles from '../styles/layout.less';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

// 菜单项
const menuItems = [
  { key: 'taskBoard', itemName: '任务看板' },
  { key: 'taskList', itemName: '任务列表' },
];

export default class LayoutBase extends React.Component<any, any> {
  // 构造函数
  constructor(props: any) {
    super(props);
    this.state = {
      menuPos: '看板',
    };
  }

  // 切换菜单
  switchMenuItem = (item: any) => {
    // 控制面包屑
    this.setState({ menuPos: item.key == 'taskBoard' ? '看板' : '列表' });
  };

  render() {
    return (
      <Layout className={styles.layout_full}>
        <Header>
          <div className={styles.logo}>KuMi</div>
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={this.switchMenuItem}
            defaultSelectedKeys={['taskBoard']}
          >
            {menuItems.map((item) => {
              return <Menu.Item key={item.key}>{item.itemName}</Menu.Item>;
            })}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', height: '100%' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>任务</Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.menuPos}</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.site}>{this.props.children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          MintBlue Design ©2021 Created by DDDDanny
        </Footer>
      </Layout>
    );
  }
}
