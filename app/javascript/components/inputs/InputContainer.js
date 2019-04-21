import React from "react"
import PropTypes from "prop-types"

import Label from 'components/inputs/Label'
import Hint from 'components/inputs/Hint'

const InputContainer = ({label, icon, hint, children}) => {
  return (
    <div className="control-block">
      { label && <Label label={label} icon={icon} /> }
      { hint && <Hint value={hint}/> }

      {children}
    </div>
  );
}

//class InputContainer extends React.Component {
//  render () {
//    const {
//      label,
//      icon,
//      hint,
//      children
//    } = this.props
//
//    return (
//      <div className="control-block">
//        { label && <Label label={label} icon={icon} /> }
//        { hint && <Hint value={hint}/> }
//
//        {children}
//      </div>
//    );
//  }
//}

InputContainer.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  hint: PropTypes.string
};

export default InputContainer
