import React from 'react'
import Icon from 'components/inputs/Icon'

import classNames from 'classnames'

class Alert extends React.Component {
  render() {
    const { alertClass, message, onClose } = this.props
    const className = classNames("alert", alertClass, "fade in")

    return (
      <div className="alert-wrapper">
        <div className={className} role="alert">
          <p>{message}</p>
          <button className="close" type="button" onClick={onClose}>
            <Icon icon="cancel"/>
          </button>
        </div>
      </div>
    )
  }
}

export default Alert
