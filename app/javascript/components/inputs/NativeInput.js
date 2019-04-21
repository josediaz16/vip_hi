import React from "react"
import PropTypes from "prop-types"

import InputContainer from 'components/inputs/InputContainer'

class NativeInput extends React.Component {
  render () {
    const {
      label,
      icon,
      iconSource,
      hint,
      otherProps: otherProps={label, icon, iconSource, hint},
      ...inputProps
    } = this.props

    return(
      <InputContainer {...otherProps}>
        <input type="text" {...inputProps}/>
      </InputContainer>
    )
  }
}

NativeInput.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  iconSource: PropTypes.string
};

export default NativeInput
