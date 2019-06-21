import React          from 'react'
import PhoneInput     from 'react-phone-number-input'
import NativeInput    from 'components/inputs/NativeInput'

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
      label,
      error,
      hint,
      icon,
      inputContainerProps: inputContainerProps={label, icon, hint},
      ...otherProps
    } = this.props

    return (
      <NativeInput {...inputContainerProps}>
        <PhoneInput
          value={this.state.phone}
          onChange={this.onChange}
          {...otherProps}
        />
        <input type="hidden" value={this.state.country} name={countryInputName}/>
      </NativeInput>
    )
  }
}

export default PhoneNumberInput
