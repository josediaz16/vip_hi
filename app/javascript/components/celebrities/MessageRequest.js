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

    return (
      <React.Fragment>
        {
          showErrorAlert && <Alert message={t.alerts.error} onClose={onCloseAlert}/>
        }
        <form className="std-box darken-form" action={message_request_url} ref={formRef} onSubmit={onSubmit} noValidate>
          <h3>{`Pide un saludo a ${celebrity.user.known_as}`}</h3>

          <div className="grid-block">
            <div className="span-sm-12 span-md-10">
              <RadioGroupInput
                label="Este video es para:"
                name="message_request[recipient_type]"
                options={[
                  {label: 'Mi', value: 'me'},
                  {label: 'Alguien más', value: 'someone_else'},
                ]}
                currentValue={message_request.recipient_type}
                onChange={handleChange}
              />

              <div className="grid-block grid-gap-40">
                <div className="span-sm-12 span-md-5">
                  <NativeInput
                    placeholder="Nombre de quien lo envía"
                    name="message_request[from]"
                    value={message_request.from}
                    onChange={handleChange}
                    error={mrTouched.from && mrErrors.from}
                  />
                </div>

                <div className="span-sm-12 span-md-5">
                  <NativeInput
                    placeholder="Nombre de quien lo recibe"
                    name="message_request[to]"
                    value={message_request.to}
                    onChange={handleChange}
                    error={mrTouched.to && mrErrors.to}
                  />
                </div>
              </div>

              <NativeInput
                label={`Mis instruccciones para ${celebrity.user.known_as} son:`}
              >
                <TextAreaAutoSize
                  placeholder="Pepito va a cumplir 25 años muy pronto. Por favor deseale un feliz cumpleaños de mi parte! Enviale saludos de Maria y Jose"
                  name="message_request[brief]"
                  value={message_request.brief}
                  onChange={handleChange}
                  error={mrTouched.brief && mrErrors.brief}
                  minRows={1}
                  maxRows={4}
                />
              </NativeInput>

              <NativeInput error={mrTouched.email_to && mrErrors.email_to}>
                <label className="with-middle-icon">
                  El video llegará por <Icon icon="social-whatsapp"/> <strong> whatsapp </strong> por favor escribe el numero de teléfono
                </label>

                <input
                  id="whatsapp"
                  type="phone"
                  placeholder="318 4856 317"
                  value={message_request.email_to}
                  name="message_request[email_to]"
                  onChange={handleChange}
                />
              </NativeInput>

              <input type="hidden" name="message_request[celebrity_id]" value={celebrity.id}/>
            </div>
          </div>

          <button className="button-primary" type="submit">Comprar saludo $350.000</button>
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
        email_to: '',
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
