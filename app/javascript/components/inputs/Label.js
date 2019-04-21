import React from "react"
import PropTypes from "prop-types"

import Icon from "components/inputs/Icon"

class Label extends React.Component {
  render () {
    const { label, icon, children, ...labelProps } = this.props

    return (
      <label {...labelProps}>
        { icon &&
          <Icon icon={icon}/>
        }
        {label}
        {children}
      </label>
    );
  }
}

Label.propTypes = {
  icon: PropTypes.string,
};

export default Label
