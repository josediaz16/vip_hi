import * as Yup       from 'yup'
import { withFormik } from 'formik'
import SteroidsForm   from 'components/hoc/SteroidsForm'

const PhoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const RequiredBlankString = Yup
    .string()
    .required("__blank__")

const RequiredEmail = (message) => {
  return RequiredBlankString.email(message)
}

const RequiredPhoneNumber = (message) => {
  return RequiredBlankString.matches(PhoneRegex, message)
}

const ConfirmationString = (ref, message) => {
  return RequiredBlankString.oneOf([Yup.ref(ref), null], message)
}

const ValidationSchema = (key, schema) => {
  return Yup.object().shape({
    [key]: Yup.object().shape(schema)
  })
}

const mapPropsToStatus = ({showErrorAlert}) => ({showErrorAlert})

const mapPropsToValues = (key) => {
  return (props) => ({
    [key]: props[key],
    formRef: props.formRef
  })
}

const BuildValidator = (schemaName, schema) => {
  return (t, onSubmit) => {
    return withFormik({
      validationSchema: schema(t),
      mapPropsToValues: mapPropsToValues(schemaName),
      mapPropsToStatus: mapPropsToStatus,
      handleSubmit: onSubmit
    })(SteroidsForm)
  }
}

export {
  RequiredBlankString,
  RequiredEmail,
  RequiredPhoneNumber,
  ConfirmationString,
  ValidationSchema,
  mapPropsToStatus,
  mapPropsToValues,
  BuildValidator
}

