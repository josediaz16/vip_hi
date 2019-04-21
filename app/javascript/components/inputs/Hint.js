import React from "react"
import PropTypes from "prop-types"

class Hint extends React.Component {
  render () {
    return (
      <span className="input-hint">{this.props.value}</span>
    );
  }
}

Hint.propTypes = {
  value: PropTypes.string
};

export default Hint
