import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import ajax from 'http/index'
import { Form, Select, Button, Input, Upload, Icon, message } from 'antd'
import './index.less'
const Option = Select.Option
const FormItem = Form.Item
const TextArea = Input.TextArea

class ArticleEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          id: props.id,
          data: {
            cid: 1,
            title: '',
            summary: '',
            author: '',
            content: '',
            link: '',
            thumb: ''
          }
        }
    }
    componentWillMount () {
      this.getdata({
        id: this.state.id
      });
    }
    getdata (params) {
      ajax({
        method: 'get',
        url: '/article/get',
        params: params
      }).then(res => {
        if (res.code === 0) {
          this.setState({
            data: res.data
          })
        }
      })
    }
    render () {
      const { getFieldDecorator } = this.props.form
      const data = this.state.data
      return (
          <div style={{ padding: '15px 0' }}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('title', {
                    initialValue: data.title,
                    rules: [{ required: true, message: '标题不能为空' }]
                  })(
                    <Input placeholder='请输入文章标题' />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('author', {
                    initialValue: data.author
                  })(
                    <Input placeholder='请输入文章作者' />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('summary', {
                    initialValue: data.summary
                  })(
                    <Input placeholder='请输入文章概要' />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('content', {
                    initialValue: data.content
                  })(
                    <Input placeholder='请输入文章概要' />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('link', {
                    initialValue: data.link
                  })(
                    <Input placeholder='如果文章无内容，可以提供文章外链' />
                  )}
                </FormItem>
              </Form>
          </div>
      )
    }
}

export default withRouter(Form.create()(ArticleEdit))