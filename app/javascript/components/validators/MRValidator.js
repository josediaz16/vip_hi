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
    phone_to: RequiredEmail(emailFormat),
    recipient_type: Yup.string().oneOf(['someone_else', 'me']),
    brief: RequiredBlankString
      .min(20, "Debe tener minimo 20 caracteres")
      .max(700, "Debe tener máximo 700 caracteres"),
    celebrity_id: Yup.number().required("__blank__")
  })
}

const MRValidator = BuildValidator("message_request", MRSchema)

export default MRValidator
