const Switch = props => {
    const { test, children } = props

    // filter out only children with a matching prop
    return children.find(child => {
      return child.props.value === null || child.props.value === test
    })      
  }

export default Switch