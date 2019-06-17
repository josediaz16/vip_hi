import React from 'react'
import {
  NativeInput,
  PhoneNumberInput,
} from 'components/inputs/index'

import UserValidator from 'components/validators/UserValidator'
import Alert         from 'components/Alert'

import { onSubmit }  from 'components/SubmitHandlers'

class UserForm extends React.Component {
  render() {
    const {
      values: {user, formRef},
      status: {showErrorAlert},
      handleChange,
      errors:  {user: userErrors={}},
      touched: {user: userTouched={}},
      t,
      url,
      actionText,
      onSubmit,
      onCloseAlert
    } = this.props

    return (
      <div className="std-box">
        <h2>Create account</h2>
        {
          showErrorAlert && <Alert message={t.alerts.error} onClose={onCloseAlert}/>
        }
        <form action={url} ref={formRef} onSubmit={onSubmit} noValidate>
          <NativeInput
            label={t.labels.name}
            name="user[name]"
            value={user.name}
            onChange={handleChange}
          />
          <NativeInput
            label={t.labels.known_as}
            name="user[known_as]"
            value={user.known_as}
            onChange={handleChange}
            error={userTouched.known_as && userErrors.known_as}
            hint="Tu nombre artistico"
          />
          <NativeInput
            label={t.labels.email}
            type="email"
            name="user[email]"
            value={user.email}
            onChange={handleChange}
            error={userTouched.email && userErrors.email}
          />
          <NativeInput
            label={t.labels.password}
            type="password"
            name="user[password]"
            value={user.password}
            onChange={handleChange}
            error={userTouched.password && userErrors.password}
          />
          <NativeInput
            label={t.labels.password_confirmation}
            type="password"
            name="user[password_confirmation]"
            value={user.password_confirmation}
            onChange={handleChange}
            error={userTouched.password_confirmation && userErrors.password_confirmation}
          />
          <PhoneNumberInput
            country={user.country}
            placeholder={"Enter phone number"}
            name="user[phone]"
            countryInputName="user[country]"
          />
          <NativeInput
            label={t.labels.photo}
            type="file"
            name="user[photo]"
            value={user.photo}
            onChange={handleChange}
          />

          <button className="button-primary" type="submit">{t.actions.submit}</button>
        </form>
      </div>
    )
  }
}

class UserCreator extends React.Component {
  constructor(props) {
    super()

    this.initialState = {
      name: '',
      email: '',
      known_as: '',
      password: '',
      phone: '',
      password: '',
      password_confirmation: '',
      country: 'CO',
      photo: ''
    }

    this.formRef = React.createRef()
    this.EnhancedCreator = UserValidator(
      props.t,
      onSubmit({
        "user.email": "user.email"
      })
    )
  }

  render() {
    const EnhancedCreator = this.EnhancedCreator
    return (
      <EnhancedCreator
        {...this.props}
        showErrorAlert={false}
        user={this.initialState}
        formRef={this.formRef}
      >
        <UserForm />
      </EnhancedCreator>
    )
  }
}

export default UserCreator
