import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import ajax from 'http/index'
import { Button } from 'antd-mobile'
import './index.less'

class Weiquan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          pid: this.props.match.params.pid,
          data: []
        }
    }
    componentWillMount () {
      
    }
    getdata (pid) {
      ajax({
        method: 'get',
        data: {
          pid: this.state.pid
        }
      }).then(res => {
        if (res.code === 0) {
          this.setState({
            data: res.data
          })
        }
      })
    }
    render() {
        return (
            <div style={{ padding: '150px 0' }}>
                
            </div>
        )
    }
}

export default withRouter(Weiquan)