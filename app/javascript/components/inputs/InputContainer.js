import React from "react"
import PropTypes from "prop-types"

import Label from 'components/inputs/Label'
import Hint from 'components/inputs/Hint'

const InputContainer = ({wrapperClass, label, icon, hint, children}) => {
  const divClass = wrapperClass || "input-wrapper"
  return (
    <div className={divClass}>
      { label && <Label label={label} icon={icon} /> }
      {children}
      { hint && <Hint value={hint}/> }
    </div>
  );
}

InputContainer.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  hint: PropTypes.string
};

export default InputContainer
