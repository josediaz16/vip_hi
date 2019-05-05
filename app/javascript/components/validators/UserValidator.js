import * as Yup from 'yup'
import {
  RequiredBlankString,
  RequiredEmail,
  ConfirmationString,
  ValidationSchema,
  BuildValidator
} from './Base'


const UserSchema = (t) => {
  return ValidationSchema("user", {
    email: RequiredEmail("wrong email bitch"),
    name: Yup.string(),
    known_as: RequiredBlankString,
    phone: Yup.string(),
    password: RequiredBlankString,
    password_confirmation: ConfirmationString("password", "Passwords wrong bitch")
  })
}

const UserValidator = BuildValidator("user", UserSchema)

export default UserValidator
