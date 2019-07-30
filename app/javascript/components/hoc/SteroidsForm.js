import React from 'react'

const actionForMethod = (method) => {
  switch(method) {
    case "PATCH":
      return "update"
    default:
      return "create"
  }
}

class SteroidsForm extends React.Component {
  onSubmit(event) {
    event.preventDefault()
    this.props.handleSubmit(event)
    this.showAlert()
  }

  showAlert() {
    setTimeout(() => {
      const {setStatus, isValid} = this.props

      if (!isValid) {
        setStatus({showErrorAlert: true})
        //window.scrollTo(0, 0)
      }
    }, 100)
  }

  onCloseAlert(event) {
    this.props.setStatus({showErrorAlert: false})
  }

  render() {
    const { children, ...otherProps } = this.props
    const actionText = this.props.t.actions[actionForMethod(this.props.method)]

    const newChildren = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        ...otherProps,
        index,
        actionText,
        onSubmit: this.onSubmit.bind(this),
        onCloseAlert: this.onCloseAlert.bind(this)
      })
    })

    return (
      <React.Fragment>
        { newChildren }
      </React.Fragment>
    )
  }
}

export default SteroidsForm
