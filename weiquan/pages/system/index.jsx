import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import ajax from 'http/index'
import { Form, Select, Button, Input, Upload, Icon, Message } from 'antd'
import './index.less'
const Option = Select.Option
const FormItem = Form.Item
const TextArea = Input.TextArea

class System extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          data: {
            id: 1,
            title: '',
            bg: ''
          }
        }
    }
    componentWillMount () {
      this.getdata({
        id: this.state.data.id
      });
    }
    getdata (params) {
      ajax({
        method: 'get',
        url: '/system/get',
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
        url: '/system/update',
        data: data
      }).then(res => {
        if (res.code === 0) {
          Message.success('保存成功')
        }
      })
    }
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    }
    // 上传
    handleUpload (res) {
      if (res.file.response && res.file.response.code === 0) {
        const data = this.state.data;
        data.bg = res.file.response.data.file_path;
        this.setState({data})
      } else if (res.file.response && res.file.response.msg) {
        message.error(res.file.response.msg)
      }
    }
    handleSubmit () {
      this.props.form.validateFields(
        (err) => {
          if (!err) {
            const formData = this.props.form.getFieldsValue()
            formData.id = this.state.data.id
            formData.bg = this.state.data.bg
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
                    <Input placeholder='请输入网站标题' />
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
                      <Icon type='upload' /> 上传背景图
                    </Button>
                  </Upload>
                  {data.bg ? <div style={{ width: '300px', marginTop: '20px' }}><img style={{ width: '100%' }} alt='thumb' src={data.bg} /></div> : ''}
                </FormItem>
                <FormItem>
                  <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                </FormItem>
              </Form>
          </div>
      )
    }
}

export default withRouter(Form.create()(System))