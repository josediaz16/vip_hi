import React from 'react'
import Icon  from 'components/inputs/Icon'

const Footer = ({t}) => {
  return (
    <footer>
      <h4>No olvides seguirnos en nuestras redes sociales</h4>
      <div className="social-networks">
        <a href="">
          <Icon icon="facebook-square"/>
        </a>
        <a href="">
          <Icon icon="instagram"/>
        </a>
        <a href="">
          <Icon icon="instagram"/>
        </a>
      </div>
    </footer>
  )
}

export default Footer
