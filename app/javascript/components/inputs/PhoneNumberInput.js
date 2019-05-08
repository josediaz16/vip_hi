import React from 'react'
import PhoneInput from 'react-phone-number-input'

import 'react-phone-number-input/style.css'

class PhoneNumberInput extends React.Component {
  constructor() {
    super()

    this.state = {
      phone: "",
      country: ""
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.setState({country: this.findCountry()})
  }

  findCountry() {
    return document.querySelector(`select[name='${this.props.name}__country']`).value
  }

  onChange(phone) {
    const country = this.findCountry()
    this.setState({phone, country})
  }

  render() {
    const {
      countryInputName,
      ...otherProps
    } = this.props

    return (
      <React.Fragment>
        <PhoneInput
          value={this.state.phone}
          onChange={this.onChange}
          {...otherProps}
        />
        <input type="hidden" value={this.state.country} name={countryInputName}/>
      </React.Fragment>
    )
  }
}

export default PhoneNumberInput
