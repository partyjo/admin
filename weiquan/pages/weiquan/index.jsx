import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import ajax from 'http/index'
import { Table, Select } from 'antd'
import './index.less'
const Option = Select.Option;
class Weiquan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          pid: 1,
          data: [],
          pagination: {
            current: 1,
            pageSize: 10,
            total: 0
          },
          loading: false
        }
        this.columns = [{
          title: '姓名',
          dataIndex: 'name',
          width: '20%',
        }, {
          title: '联系方式',
          dataIndex: 'mobile',
          width: '20%',
        }, {
          title: '诉求',
          dataIndex: 'needs'
        }];
    }
    componentWillMount () {
      this.getdata({
        pageSize: this.state.pagination.pageSize,
        pageIndex: this.state.pagination.current,
        pid: this.state.pid
      });
    }
    handleTableChange (pagination) {
      this.getdata({
        pageSize: pagination.pageSize,
        pageIndex: paginatpageion.current,
        pid: this.state.pid
      });
    }
    handleChange (value) {
      this.setState({
        pid: value,
        data: [],
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0
        },
        loading: false
      })
      this.getdata({
        pageSize: 10,
        pageIndex: 1,
        pid: value
      });
    }
    getdata (params) {
      this.setState({ loading: true })
      ajax({
        method: 'get',
        url: '/forms/page',
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
                <Select defaultValue='1' style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                  <Option value='1'>妇儿天地</Option>
                  <Option value='2'>工会</Option>
                  <Option value='3'>团委</Option>
                </Select>
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

export default withRouter(Weiquan)