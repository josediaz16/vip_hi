import { makeRequest } from 'components/Utils'

const changeLocation = ({redirect_url}) => {
  window.location.assign(redirect_url)
}

const handleError = (errorConfig, formikBag, payload, errorHandler, apiResponse) => {
  const {responseJSON: {errors}} = apiResponse

  // Set Errors on FormikBag
  Object.keys(errorConfig).forEach(key => {
    const [objectClass, field] = key.split(".")
    const error = errors.find(item => (item.object_class === objectClass) && (item.field === field))

    error && formikBag.setFieldError(errorConfig[key], error.description)
  })

  // Call special error handler if provided
  errorHandler && errorHandler({apiResponse, formikBag, payload})

  // Scroll up and show alert
  setTimeout(() => {
    const {setStatus, isValid} = formikBag

    if (!isValid) {
      setStatus({showErrorAlert: true})
      window.scrollTo(0, 0)
    }
  }, 100)
}

const onSubmit = (errorConfig, {errorHandler, successHandler}={}) => {
  return (payload, formikBag) => {
    const {
      formRef: {current: form}
    } = payload

    const formData = new FormData(form)
    const method = formikBag.props.method || "POST"

    makeRequest(form.action, method, formData)
      .then(successHandler || changeLocation)
      .catch(errors => handleError(errorConfig, formikBag, payload, errorHandler, errors) )
  }
}

export {
  onSubmit
}
