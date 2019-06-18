import React from 'react'
import Icon from './Icon'

class StatefulInput extends React.Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  onInput(event) {
    this.setState({value: event.target.value})
  }

  clearInput() {
    console.log("hola")
    this.setState({value: ''})
  }

  render() {
    return (
      <React.Fragment>
        <input
          {...this.props}
          value={this.state.value}
          onChange={this.onInput.bind(this)}
        />
        { this.state.value !== '' &&
          <Icon
            icon="cancel"
            className="round"
            onClick={this.clearInput.bind(this)}
          />
        }
      </React.Fragment>
    )
  }
}

export default StatefulInput
