import React from 'react'
import {
  NativeInput
} from 'components/inputs/index'

class UserCreator extends React.Component {
  render() {
    const {
      t
    } = this.props

    return (
      <React.Fragment>
        <h2>Sign up</h2>
        <form action="">
          <NativeInput label={t.labels.first_name}/>
          <NativeInput label={t.labels.last_name}/>
          <NativeInput label={t.labels.password} type="password"/>
          <NativeInput label={t.labels.password_confirmation} type="password"/>

          <button type="submit">{t.actions.submit}</button>
        </form>
      </React.Fragment>
    )
  }
}

export default UserCreator
