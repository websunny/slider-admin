import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import AddMatch from './components/AddMatch'
import './App.css'


const { Header, Content, Footer, Sider } = Layout

class App extends React.Component {
  state = {
    collapsed: false,
    selectedKeys: 1
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }
  
  changeStatus = ({item, key }) => {
    this.setState({ 
      selectedKeys :key
    })
  }

  render() {
    const {selectedKeys} = this.state
    console.log(selectedKeys)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.changeStatus}>
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>新增或修改模版</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>已有的模版列表</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{  }}>NEWS TEMPLATE ADMIN </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {
                Number(selectedKeys) === 1 ? <Breadcrumb.Item>请填写相关信息用于新增修改或删除模版(注意新增或者修改模版需要填写所有信息，删除模版必须填写模版名称，其他填不填无所谓)</Breadcrumb.Item>:<Breadcrumb.Item>暂未开发</Breadcrumb.Item>
              }
            </Breadcrumb>
              {
                Number(selectedKeys) === 1 ? <AddMatch />: ""
              }
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}


export default App