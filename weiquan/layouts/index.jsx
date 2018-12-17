import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { withRouter, Link } from 'react-router-dom'
import './index.less'

const { Header, Content, Footer } = Layout;

export default withRouter(props => (
	<Layout className="layout">
		<Header>
			<div className="logo" />
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={['/home']}
				selectedKeys={[props.history.location.pathname]}
				style={{ lineHeight: '64px' }}
			>
				<Menu.Item key="/home"><Link to='/home'>首页</Link></Menu.Item>
				<Menu.Item key="/weiquan"><Link to='/weiquan'>维权管理</Link></Menu.Item>
				<Menu.Item key="/article/list"><Link to='/article/list'>文章管理</Link></Menu.Item>
				<Menu.Item key="/system"><Link to='/system'>系统设置</Link></Menu.Item>
			</Menu>
		</Header>
		<Content style={{ padding: '0 50px', marginTop: 50 }}>
			{/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
			<div style={{ background: '#fff', padding: 24, minHeight: 600 }}>{props.children}</div>
		</Content>
		<Footer style={{ textAlign: 'center' }}>
			Mui Design ©2018 Created by wechat 303890562
		</Footer>
	</Layout>
))