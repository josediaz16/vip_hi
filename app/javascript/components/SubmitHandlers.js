import { makeRequest } from 'components/Utils'

const changeLocation = ({redirect_url}) => {
  window.location.assign(redirect_url)
}

const handleError = (errorConfig, formikBag, {responseJSON: {errors}}) => {
  Object.keys(errorConfig).forEach(key => {
    const [objectClass, field] = key.split(".")
    const error = errors.find(item => (item.object_class === objectClass) && (item.field === field))

    error && formikBag.setFieldError(errorConfig[key], error.description)
  })

  setTimeout(() => {
    const {setStatus, isValid} = formikBag

    if (!isValid) {
      setStatus({showErrorAlert: true})
      window.scrollTo(0, 0)
    }
  }, 100)
}

const onSubmit = (errorConfig) => {
  return (payload, formikBag) => {
    const {
      formRef: {current: form}
    } = payload

    const formData = new FormData(form)
    const method = formikBag.props.method || "POST"

    makeRequest(form.action, method, formData)
      .then(changeLocation)
      .catch(error => handleError(errorConfig, formikBag, error) )
  }
}

export {
  onSubmit
}
