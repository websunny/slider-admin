import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import Main from '../../container/Main'
import List from '../../container/List'
import { Switch,Route,Link,withRouter } from 'react-router-dom'
import './style.css'


const { Header, Footer, Sider } = Layout

class App extends React.Component {
  state = {
    collapsed: false,
    activeKey:'1'
  }
  
  componentDidMount(){
    if(this.props.location.pathname.includes('list')){
      this.setState({ 
        activeKey :'2'
      })
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  changeStatus= value =>{
    this.setState({ 
        activeKey :value.key
      })
  }
  
  
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" selectedKeys={this.state.activeKey} mode="inline" onClick={this.changeStatus}>
            <Menu.Item key="1">
              <Link to='/main'>
                <Icon type="pie-chart" />
                <span>新增或修改模版</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/list'>
                <Icon type="desktop" />
                <span>已有的模版列表</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{  }}>NEWS TEMPLATE ADMIN </Header>
          <Switch>
              <Route
                  exact
                  path={['/main','/','/main/:name/:id']}
                  component={Main}
                />
                <Route
                  exact
                  path={['/list']}
                  component={List}
                />
          </Switch>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}


export default withRouter(App)