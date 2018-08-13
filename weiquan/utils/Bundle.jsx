import React from 'react'

class Bundle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mod: null
    }
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {

    this.setState({
      mod: null
    });

    props.load((mod) => {


      this.setState({
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

const Loading = () => <div>Loading...</div>

export default (loadComponent, props) => {
  return () => {
    return (
      <Bundle load={loadComponent}>
        {Comp => (Comp ? <Comp {...props} /> : <Loading />)}
      </Bundle>
    )
  }
}
