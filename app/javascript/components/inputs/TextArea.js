import React from "react"
import PropTypes from "prop-types"

import NativeInput from 'components/inputs/NativeInput'

class TextArea extends React.Component {
  render () {
    return (
      <NativeInput {...this.props}>
        <textarea rows="4"/>
      </NativeInput>
    );
  }
}

TextArea.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
};

export default TextArea
