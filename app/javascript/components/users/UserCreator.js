import React from 'react'
import {
  NativeInput,
  PhoneNumberInput,
} from 'components/inputs/index'

import UserValidator from 'components/validators/UserValidator'

import { makeRequest } from 'components/Utils'

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
      <React.Fragment>
        <h2>Sign up</h2>
        <form action={url} ref={formRef} onSubmit={onSubmit} noValidate>
          <NativeInput
            label={t.labels.email}
            type="email"
            name="user[email]"
            value={user.email}
            onChange={handleChange}
            error={userTouched.email && userErrors.email}
          />
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

          <button type="submit">{t.actions.submit}</button>
        </form>
      </React.Fragment>
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
      country: 'CO'
    }

    this.formRef = React.createRef()
    this.EnhancedCreator = UserValidator(props.t, this.onSubmit.bind(this))
  }

  changeLocation({redirect_url}) {
    window.location.assign(redirect_url)
  }

  handleError(formikBag, {responseJSON: {errors}}) {
    const errorConfig = {
      "user.email": "user.email"
    }

    Object.keys(errorConfig).forEach(key => {
      const [objectClass, field] = key.split(".")
      const error = errors.find(item => (item.object_class === objectClass) && (item.field === field))
      error && formikBag.setFieldError(errorConfig[key], error.description)
    })
  }

  onSubmit(payload, formikBag) {
    const { formRef: {current: form} } = payload

    const formData = new FormData(form)
    const method = formikBag.props.method || "POST"

    makeRequest(form.action, method, formData)
      .then(this.changeLocation.bind(this))
      .catch(this.handleError.bind(this, formikBag))
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
