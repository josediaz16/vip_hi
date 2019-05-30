import React from 'react'

import {
  NativeInput,
  TextArea,
} from 'components/inputs/index'

import MRValidator   from 'components/validators/MRValidator'
import Alert         from 'components/Alert'
  
import { onSubmit }  from 'components/SubmitHandlers'

class MessageRequestForm extends React.Component {
  render() {
    const {
      values: {message_request, formRef},
      status: {showErrorAlert},
      handleChange,
      errors:  {message_request: mrErrors={}},
      touched: {message_request: mrTouched={}},
      t,
      celebrity_id,
      message_request_url,
      actionText,
      onSubmit,
      onCloseAlert
    } = this.props

    return (
      <React.Fragment>
        <h2>Message Request</h2>
        {
          showErrorAlert && <Alert message={t.alerts.error} onClose={onCloseAlert}/>
        }
        <form action={message_request_url} ref={formRef} onSubmit={onSubmit} noValidate>
          <NativeInput
            label={t.labels.from}
            name="message_request[from]"
            value={message_request.from}
            onChange={handleChange}
            error={mrTouched.from && mrErrors.from}
          />

          <NativeInput
            label={t.labels.to}
            name="message_request[to]"
            value={message_request.to}
            onChange={handleChange}
            error={mrTouched.to && mrErrors.to}
          />

          <NativeInput
            label={t.labels.email_to}
            name="message_request[email_to]"
            value={message_request.email_to}
            onChange={handleChange}
            error={mrTouched.email_to && mrErrors.email_to}
          />

          <TextArea
            label={t.labels.brief}
            name="message_request[brief]"
            value={message_request.brief}
            onChange={handleChange}
            error={mrTouched.brief && mrErrors.brief}
          />
          <input type="hidden" name="message_request[celebrity_id]" value={celebrity_id}/>

          <button type="submit">{t.actions.submit}</button>
        </form>
      </React.Fragment>
    )
  }
}

class MessageRequest extends React.Component {
  constructor(props) {
    super()

    this.initialState = {
      brief: '',
      email_to: '',
      to: '',
      from: '',
      celebrity_id: props.celebrity_id,
    }

    this.formRef = React.createRef()
    this.EnhancedForm = MRValidator(
      props.t.front_validations,
      onSubmit({
      })
    )
  }

  render() {
    const EnhancedForm = this.EnhancedForm
    return (
      <EnhancedForm
        {...this.props}
        showErrorAlert={false}
        message_request={this.initialState}
        formRef={this.formRef}
      >
        <MessageRequestForm/>
      </EnhancedForm>
    )
  }
}

export default MessageRequest
