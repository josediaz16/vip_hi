import * as Yup from 'yup'
import {
  RequiredBlankString,
  RequiredEmail,
  ConfirmationString,
  ValidationSchema,
  BuildValidator
} from './Base'


const UserSchema = ({front_validations: {email, password_confirmation}}) => {
  return ValidationSchema("user", {
    email: RequiredEmail(email.format),
    name: Yup.string(),
    known_as: RequiredBlankString,
    phone: Yup.string(),
    photo: Yup.mixed(),
    password: RequiredBlankString,
    password_confirmation: ConfirmationString("password", password_confirmation)
  })
}

const UserValidator = BuildValidator("user", UserSchema)

export default UserValidator
