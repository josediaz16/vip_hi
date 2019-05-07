import React      from "react"
import PropTypes  from "prop-types"
import classNames from "classnames"

import InputContainer from 'components/inputs/InputContainer'
import ErrorMessage   from 'components/inputs/ErrorMessage'

class NativeInput extends React.Component {
  render () {
    const {
      label,
      icon,
      hint,
      children,
      error,
      otherProps: otherProps={label, icon, hint},
      ...inputProps
    } = this.props

    const inputClass = classNames({"field-error": error})

    return(
      <InputContainer {...otherProps}>
        { children || <input type="text" className={inputClass} {...inputProps}/> }
        <ErrorMessage error={error}/>

      </InputContainer>
    )
  }
}

NativeInput.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  hint: PropTypes.string
};

export default NativeInput
