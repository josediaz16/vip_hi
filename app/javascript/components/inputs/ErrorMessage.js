import React from 'react'

const ErrorMessage = ({error}) => {
  const displayableError = error === "__blank__" ? null : error

  if(displayableError) {
    return <span className="field-error">{displayableError}</span>
  }
  else {
    return null
  }
}

export default ErrorMessage
