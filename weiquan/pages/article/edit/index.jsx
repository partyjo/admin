import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Editor from 'components/draft/index'
import ajax from 'http/index'
import { Form, Select, Button, Input, Upload, Icon, Message } from 'antd'
import './index.less'
const Option = Select.Option
const FormItem = Form.Item
const TextArea = Input.TextArea

class ArticleEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          id: parseInt(props.match.params.id),
          data: {
            cid: 1,
            title: '',
            summary: '',
            author: '',
            content: '<p>请输入文章内容</p>',
            link: '',
            thumb: ''
          }
        }
        this.editorcontent = ''
    }
    componentWillMount () {
      if (this.state.id) {
        this.getdata({
          id: this.state.id
        });
      }
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
    saveData (data) {
      ajax({
        method: 'post',
        url: data.id ? '/article/update' : '/article/add',
        data: data
      }).then(res => {
        if (res.code === 0) {
          Message.success('保存成功')
          if (this.state.id === 0) {
            location.href = '/weiquan-admin/#/article/list'
          }
        }
      })
    }
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJPG) {
        Message.error('You can only upload JPG OR PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        Message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    }
    // 上传
    handleUpload (res) {
      if (res.file.response && res.file.response.code === 0) {
        const data = this.state.data;
        data.thumb = res.file.response.data.file_path;
        this.setState({data})
      } else if (res.file.response && res.file.response.msg) {
        message.error(res.file.response.msg)
      }
    }
    handleEditorChange (content) {
      this.editorcontent = content
    }
    handleSubmit () {
      this.props.form.validateFields(
        (err) => {
          if (!err) {
            const formData = this.props.form.getFieldsValue()
            formData.cid = 1
            formData.content = this.editorcontent
            formData.thumb = this.state.data.thumb
            if (this.state.id) {
              formData.id = this.state.id
            }
            console.log(formData)
            this.saveData(formData)
          }
        }
      )
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
                    <TextArea rows={3} placeholder='请输入文章概要' />
                  )}
                </FormItem>
                <FormItem>
                  <Upload 
                    name='postFile'
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleUpload.bind(this)}
                    action='/server/weiquan/upload/img'
                    showUploadList={false}
                    listType='picture'>
                    <Button>
                      <Icon type='upload' /> 上传缩略图
                    </Button>
                  </Upload>
                  {data.thumb ? <div style={{ width: '300px', marginTop: '20px' }}><img style={{ width: '100%' }} alt='thumb' src={data.thumb} /></div> : ''}
                </FormItem>
                <FormItem>
                  <Editor onChange={this.handleEditorChange.bind(this)} content={data.content} />
                </FormItem>
                <FormItem>
                  {getFieldDecorator('link', {
                    initialValue: data.link
                  })(
                    <Input placeholder='如果文章无内容，可以提供文章外链' />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                </FormItem>
              </Form>
          </div>
      )
    }
}

export default withRouter(Form.create()(ArticleEdit))