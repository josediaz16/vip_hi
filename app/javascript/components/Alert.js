import React from 'react'
//import Icon from 'lib/icons'
import classNames from 'classnames'

class Alert extends React.Component {
  render() {
    const { alertClass, message, onClose } = this.props
    const className = classNames("alert", alertClass, "fade in")

    return (
      <div className={className} role="alert">
        <button className="close" type="button" onClick={onClose}>
        </button>
        <p>{message}</p>
      </div>
    )
  }
}

export default Alert
