import React      from "react"
import PropTypes  from "prop-types"
import classNames from "classnames"

import InputContainer from 'components/inputs/InputContainer'
import ErrorMessage   from 'components/inputs/ErrorMessage'

const strongChildren = (children, props) => {
  const newChildren = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      ...props,
    })
  })

  return newChildren
}

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
        { children && strongChildren(children, {className: inputClass, ...inputProps}) }

        { !children && <input type="text" className={inputClass} {...inputProps}/> }
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
