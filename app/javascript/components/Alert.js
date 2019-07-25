import React from 'react'
import Icon from 'components/inputs/Icon'

import classNames from 'classnames'

const IconNames = {
  error: 'exclamation',
  alert: 'exclamation',
  success: 'checkmark',
  notice: 'checkmark'
}

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
    const { type, message, onClose, t } = this.props
    const className = classNames("alert", `alert-${type}`, "fade in")

    return (
      this.state.active ?
        <div className="alert-wrapper">
          <div className={className} role="alert">
            <Icon icon={IconNames[type]} className="main-icon"/>
            <h3>{t.titles[type]}</h3>
            <p>{message || t.messages[type]}</p>

            <button
              className="button-primary accept"
              type="submit"
              onClick={this.onClose.bind(this)}
            >
              Aceptar
            </button>
            {/*
            <button className="close" type="button" onClick={this.onClose.bind(this)}>
              <Icon icon="cancel"/>
            </button>
            */}
          </div>
        </div> : null
    )
  }
}

export default Alert
