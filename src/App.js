import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import './App.css';
import {Link} from 'react-router';
// Header, Footer, Sider, Content组件在Layout组件模块下
const { Header, Footer, Sider, Content } = Layout;
// 引入子菜单组件
const SubMenu = Menu.SubMenu;



class App extends Component {
  renderSiderMenu(){
    return(
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px', padding:'16px'}}>
          Traffic Vis
        </div>
        <Menu.Item key="1">
          <Link to="/pageHello">
            <Icon type="user" />
            <span>STDAL</span>
          </Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={<span><Icon type="dashboard" /><span>DashBoard</span></span>}
        >
          <Menu.Item key="3"><Link to="/pageHello">监控页</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/Analysis">分析页</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/pageTest">测试页</Link></Menu.Item>
        </SubMenu>    
      </Menu>
    )
  }

  render() {
    return (
      <Layout>
        <Sider width={180} style={{ minHeight: '100vh'}}>{this.renderSiderMenu()}</Sider>
        <Layout>
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>交通大数据可视化分析系统</Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 560,}}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Footer Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default App;