import React from 'react'
import {
  NativeInput,
  PhoneNumberInput,
} from 'components/inputs/index'

import {
  CelebrityValidator,
  FanValidator
} from 'components/validators/UserValidator'

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
      signInUrl,
      signUpUrl,
      role,
      origin,
      actionText,
      onSubmit,
      onCloseAlert
    } = this.props

    const isFan = role === "fan"

    return (
      <form className="form-wrapper" action={url} ref={formRef} onSubmit={onSubmit} noValidate>
        <h2>Create account</h2>
        {
          showErrorAlert && <Alert type="error" t={t.alerts} onClose={onCloseAlert}/>
        }
        <div className="inputs">
          { !isFan &&
            <NativeInput
              label={t.labels.known_as}
              name="user[known_as]"
              value={user.known_as}
              onChange={handleChange}
              error={userTouched.known_as && userErrors.known_as}
              hint="Shakira"
            />
          }
          { isFan &&
            <NativeInput
              label={t.labels.name}
              name="user[name]"
              value={user.name}
              onChange={handleChange}
              error={userTouched.name && userErrors.name }
            />
          }
          <PhoneNumberInput
            label={t.labels.phone}
            country={user.country}
            name="user[phone]"
            countryInputName="user[country]"
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
            hint={t.hints.password}
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

          <NativeInput
            error={userTouched.terms_and_conditions && userErrors.terms_and_conditions}
          >
            <div>
              <input
                type="checkbox"
                name="user[terms_and_conditions]"
                value={user.terms_and_conditions}
                onChange={handleChange}
              />

              <span className="terms-and-conditions">
                {t.labels.terms_and_conditions.part_1} <a className="primary-link underline-link" href="/legal">{t.labels.terms_and_conditions.link_1}</a> {t.labels.terms_and_conditions.part_2} <a className="primary-link underline-link" href="/protection_policy">{t.labels.terms_and_conditions.link_2}</a>
              </span>
            </div>
          </NativeInput>

          <input type="hidden" name="user[role]"   value={role || "celebrity"}/>
          <input type="hidden" name="user[origin]" value={origin || ""}/>
        </div>

        <div className="bottom">
          <button className="button-primary" type="submit">{t.actions.submit}</button>
          <div className="span-link">
            <span>{t.instructions.already_have_account}</span>
            <a className="primary-link underline-link" href={signInUrl}>{t.instructions.sign_in_here}</a>
          </div>
          <div className="span-link">
            <span>{t.instructions.are_you_not[role]}</span>
            <a className="primary-link underline-link" href={signUpUrl}>{t.instructions.sign_up_here}</a>
          </div>
        </div>

      </form>
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
      photo: '',
      terms_and_conditions: false
    }

    this.formRef = React.createRef()

    const Validator = props.role == "fan" ? FanValidator : CelebrityValidator
    this.EnhancedCreator = Validator(
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
