import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import ajax from 'http/index'
import { Table, Select, Popconfirm, Button } from 'antd'
import './index.less'
const Option = Select.Option;
class ArticleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          cid: 1,
          data: [],
          pagination: {
            current: 1,
            pageSize: 10,
            total: 0
          },
          loading: false
        }
        this.columns = [{
          title: '标题',
          dataIndex: 'title'
        }, {
          title: '作者',
          dataIndex: 'author',
          width: '15%'
        }, { 
          title: 'Action', 
          dataIndex: 'action', 
          width: '20%',
          render: (text, record) => <span>
            <Link to={'/article/edit/' + record.id}>编辑</Link>
            <Popconfirm title='确定删除吗？' onConfirm={this.handleDelete.bind(this, record)} okText='Yes' cancelText='No'>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        }];
    }
    handleDelete (row) {
      const index = row.index
      const data = [...this.state.data];
      this.setState({ loading: true })
      ajax({
        method: 'post',
        url: '/article/delete',
        data: {
          id: row.id
        }
      }).then(res => {
        if (res.code === 0) {
          data.splice(index, 1);
          this.setState({
            data,
            loading: false
          })
        }
      })
      
    }
    componentWillMount () {
      this.getdata({
        pageSize: this.state.pagination.pageSize,
        pageIndex: this.state.pagination.current,
        cid: this.state.cid
      });
    }
    handleTableChange (pagination) {
      this.getdata({
        pageSize: pagination.pageSize,
        pageIndex: paginatpageion.current,
        cid: this.state.cid
      });
    }
    getdata (params) {
      this.setState({ loading: true })
      ajax({
        method: 'get',
        url: '/article/page',
        params: params
      }).then(res => {
        if (res.code === 0) {
          const page = this.state.pagination
          page.current = params.pageIndex
          page.total = res.count
          this.setState({
            pagination: page,
            data: res.data,
            loading: false
          })
        }
      })
    }
    render () {
        return (
            <div style={{ padding: '15px 0' }}>
              <div style={{ marginBottom: 15 }}>
                <Button type='primary'><Link to='/article/edit/0'>新增</Link></Button>
              </div>
              <Table
                columns={this.columns}
                rowKey={record => record.id}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange.bind(this)}
              />
            </div>
        )
    }
}

export default withRouter(ArticleList)