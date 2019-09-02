import React from 'react'
import Icon  from 'components/inputs/Icon'

const Footer = ({t}) => {
  return (
    <footer>
      <h4>No olvides seguirnos en nuestras redes sociales</h4>
      <div className="social-networks">
        <a href="https://www.instagram.com/saludofamosos/">
          <Icon icon="instagram"/>
        </a>
      </div>
    </footer>
  )
}

export default Footer
