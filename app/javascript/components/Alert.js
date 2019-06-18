import React from 'react'
import Icon from 'components/inputs/Icon'

import classNames from 'classnames'

class Alert extends React.Component {
  constructor() {
    super()
    this.state = {
      active: true
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose()
    }
    else {
      this.setState({active: false})
    }
  }

  render() {
    const { alertClass, message, onClose } = this.props
    const className = classNames("alert", alertClass, "fade in")

    return (
      this.state.active ?
        <div className="alert-wrapper">
          <div className={className} role="alert">
            <p>{message}</p>
            <button className="close" type="button" onClick={this.onClose.bind(this)}>
              <Icon icon="cancel"/>
            </button>
          </div>
        </div> : null
    )
  }
}

export default Alert
