import React from 'react'
import TextAreaAutoSize from 'react-textarea-autosize'

import {
  NativeInput,
  RadioGroupInput,
  Icon,
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
      celebrity,
      message_request_url,
      actionText,
      onSubmit,
      onCloseAlert
    } = this.props

    const briefPlaceholder = message_request.recipient_type === "me" ? t.placeholders.brief_myself : t.placeholders.brief

    return (
      <React.Fragment>
        {
          showErrorAlert && <Alert message={t.alerts.error} onClose={onCloseAlert}/>
        }
        <form className="std-box darken-form" action={message_request_url} ref={formRef} onSubmit={onSubmit} noValidate>
          <h3>{`${t.titles.request_message} ${celebrity.user.known_as}`}</h3>

          <div className="grid-block">
            <div className="span-sm-12 span-md-10">
              <RadioGroupInput
                label={t.labels.recipient_type}
                name="message_request[recipient_type]"
                options={[
                  {label: t.labels.recipient_types.me, value: 'me'},
                  {label: t.labels.recipient_types.someone_else, value: 'someone_else'},
                ]}
                currentValue={message_request.recipient_type}
                onChange={handleChange}
              />

              { message_request.recipient_type === "someone_else" &&
                <div className="grid-block grid-gap-40">
                  <div className="span-sm-12 span-md-5">
                    <NativeInput
                      placeholder={t.placeholders.from}
                      name="message_request[from]"
                      value={message_request.from}
                      onChange={handleChange}
                      error={mrTouched.from && mrErrors.from}
                    />
                  </div>

                  <div className="span-sm-12 span-md-5">
                    <NativeInput
                      placeholder={t.placeholders.to}
                      name="message_request[to]"
                      value={message_request.to}
                      onChange={handleChange}
                      error={mrTouched.to && mrErrors.to}
                    />
                  </div>
                </div>
              }

              { message_request.recipient_type === "me" &&
                <div className="grid-block grid-gap-40">
                  <div className="span-sm-12 span-md-10">
                    <NativeInput
                      placeholder={t.placeholders.to_myself}
                      name="message_request[to]"
                      value={message_request.to}
                      onChange={handleChange}
                      error={mrTouched.to && mrErrors.to}
                    />
                  </div>
                </div>
              }

              <NativeInput
                label={t.labels.brief.replace("$name", celebrity.user.known_as)}
                error={mrTouched.brief && mrErrors.brief}
              >
                <TextAreaAutoSize
                  placeholder={briefPlaceholder}
                  name="message_request[brief]"
                  value={message_request.brief}
                  onChange={handleChange}
                  minRows={1}
                  maxRows={4}
                />
              </NativeInput>

              <NativeInput error={mrTouched.phone_to && mrErrors.phone_to}>
                <label className="with-middle-icon">
                  {t.labels.whatsapp.start} <Icon icon="social-whatsapp"/> <strong> whatsapp </strong> {t.labels.whatsapp.end}
                </label>

                <input
                  id="whatsapp"
                  type="phone"
                  placeholder="318 4856 317"
                  value={message_request.phone_to}
                  name="message_request[phone_to]"
                  onChange={handleChange}
                />
              </NativeInput>

              <input type="hidden" name="message_request[celebrity_id]" value={celebrity.id}/>
            </div>
          </div>

          <button className="button-primary" type="submit">{t.actions.buy} $350.000</button>
        </form>
      </React.Fragment>
    )
  }
}

const handle401 = ({apiResponse, payload}) => {
  if (apiResponse.status === 401) {
    sessionStorage.setItem('messageRequest', JSON.stringify(payload.message_request))
    window.location.assign(`/users/sign_in?role=fan&origin=${window.location.pathname}`)
  }
}

const handleSuccess = ({redirect_url}) => {
  sessionStorage.removeItem('messageRequest')
  window.location.assign(redirect_url)
}

class MessageRequest extends React.Component {
  constructor(props) {
    super()

    const previousMR = sessionStorage.getItem('messageRequest')

    if (previousMR) {
      this.initialState = JSON.parse(previousMR)
    }
    else {
      this.initialState = {
        brief: '',
        phone_to: '',
        to: '',
        from: '',
        recipient_type: 'someone_else',
        celebrity_id: props.celebrity.id,
      }
    }

    this.formRef = React.createRef()
    this.EnhancedForm = MRValidator(
      props.t.front_validations,
      onSubmit({}, {
        errorHandler: handle401,
        successHandler: handleSuccess
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
