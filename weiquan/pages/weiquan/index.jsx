import React from 'react'
import { withRouter } from 'react-router-dom'
import ajax from 'http/index'
import { Table, Select, Input, Form } from 'antd'
import './index.less'
const Option = Select.Option
const FormItem = Form.Item
const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)
class EditableCell extends React.Component {
  state = {
    editing: false
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class Weiquan extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      key: 'name',
      title: '姓名',
      dataIndex: 'name',
      width: '20%',
      editable: false
    }, {
      key: 'mobile',
      title: '联系方式',
      dataIndex: 'mobile',
      width: '20%',
      editable: false
    }, {
      key: 'needs',
      title: '诉求',
      dataIndex: 'needs',
      editable: false
    }, {
      key: 'reply',
      title: '回复',
      dataIndex: 'reply',
      editable: true
    }];
    this.state = {
      pid: 1,
      dataSource: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      loading: false
    }
  }

  componentWillMount() {
    this.getdata({
      pageSize: this.state.pagination.pageSize,
      pageIndex: this.state.pagination.current,
      pid: this.state.pid
    });
  }

  handleSave = (row) => {
    
    ajax({
      method: 'post',
      url: '/forms/update',
      data: {
        id: row.id,
        reply: row.reply
      }
    }).then(res => {
      if (res.code === 0) {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ dataSource: newData });
      }
    })
  }

  handleTableChange(pagination) {
    this.getdata({
      pageSize: pagination.pageSize,
      pageIndex: paginatpageion.current,
      pid: this.state.pid
    });
  }
  handleChange(value) {
    this.setState({
      pid: value,
      dataSource: [],
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
  getdata(params) {
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
          dataSource: res.data,
          loading: false
        })
      }
    })
  }
  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
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
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey={record => record.id}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange.bind(this)}
        />
      </div>
    )
  }
}

export default withRouter(Weiquan)