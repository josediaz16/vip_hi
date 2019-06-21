import * as Yup from 'yup'
import {
  RequiredBlankString,
  RequiredEmail,
  ValidationSchema,
  BuildValidator
} from './Base'

const MRSchema = ({email: {format: emailFormat}}) => {
  return ValidationSchema("message_request", {
    from: RequiredBlankString,
    to: RequiredBlankString,
    email_to: RequiredEmail(emailFormat),
    brief: RequiredBlankString,
    celebrity_id: Yup.number().required("__blank__")
  })
}

const MRValidator = BuildValidator("message_request", MRSchema)

export default MRValidator