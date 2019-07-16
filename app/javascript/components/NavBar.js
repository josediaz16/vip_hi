import React from 'react'
import classNames from 'classnames'

const NavBar = ({logoPath, className}) => {
  const wrapperClass = classNames("navbar-wrapper", className)
  return (
    <div className={wrapperClass}>
      <a className="logo" href="">
        <img src={logoPath} alt="" />
      </a>

      <ul>
        <li>
          <a href="">Sign up</a>
        </li>
        <li>
          <a className="active" href="">Login</a>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
