import React from 'react'
import classNames from 'classnames'

import Logo from '../../assets/images/logo_light.png'

const NavBar = ({logoPath, className}) => {
  const wrapperClass = classNames("navbar-wrapper", className)
  return (
    <div className={wrapperClass}>
      <a className="logo" href="/">
        <img src={logoPath || Logo} alt="" />
      </a>

      <ul>
        <li>
          <a href="/users/sign_up">Sign up</a>
        </li>
        <li>
          <a className="active" href="/users/sign_in">Login</a>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
