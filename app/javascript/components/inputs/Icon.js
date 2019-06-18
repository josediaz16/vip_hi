import React from "react"
import PropTypes from "prop-types"

import classNames from 'classnames'

import Svg from '../../../assets/images/icons.svg'

// This is necessary for testing purposes for now.
let svgPath;
if (typeof(Svg) === 'object' && Object.keys(Svg).length === 0) {
  svgPath = ""
}
else {
  svgPath = Svg
}


class Icon extends React.Component {
  render () {
    const { icon, className, onClick } = this.props

    const iconClass = classNames('icon', `icon-${icon}`, className)

    return (
      <svg className={iconClass} onClick={onClick}>
        <use xlinkHref={`${svgPath}#icon-${icon}`}/>
      </svg>
    );
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
};

export default Icon
