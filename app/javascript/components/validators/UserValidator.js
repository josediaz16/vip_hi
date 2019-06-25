import * as Yup from 'yup'
import {
  RequiredBlankString,
  RequiredEmail,
  ConfirmationString,
  ValidationSchema,
  BuildValidator
} from './Base'

const GeneralUser = ({front_validations: {email, password_confirmation}}) => {
  return {
    email: RequiredEmail(email.format),
    phone: Yup.string(),
    photo: Yup.mixed(),
    password: RequiredBlankString,
    password_confirmation: ConfirmationString("password", password_confirmation)
  }
}

const CelebritySchema = (t) => {
  return ValidationSchema("user", {
    name: Yup.string(),
    known_as: RequiredBlankString,
    ...GeneralUser(t)
  })
}

const FanSchema = (t) => {
  return ValidationSchema("user", {
    name: RequiredBlankString,
    known_as: Yup.string(),
    ...GeneralUser(t)
  })
}

const CelebrityValidator = BuildValidator("user", CelebritySchema)
const FanValidator       = BuildValidator("user", FanSchema)

export {
  CelebrityValidator,
  FanValidator
}
