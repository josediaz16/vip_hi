import React      from 'react'
import MediaQuery from 'react-responsive'

import MessageRequest from 'components/celebrities/MessageRequest'
import Footer         from 'components/footer'
import Icon           from 'components/inputs/Icon'

const CelebrityHeader = ({celebrity, style, children}) => {
  return (
    <div className="celebrity-header" style={style}>

      <a href="/celebrities" className="hide-on-mobile">
        <Icon icon="arrow-13" className="back"/>
      </a>

      <h1>{celebrity.user.known_as}</h1>
      <h4>{celebrity.handle}</h4>
      {children}
    </div>
  )
}

class CelebrityProfile extends React.Component {
  render() {
    const {
      celebrity,
      message_request_url,
      t,
      uyapAtad
    } = this.props
    const style = {backgroundImage: `url(${celebrity.user.photo})`}

    return (
      <React.Fragment>
        <div className="celebrity-profile">

          <MediaQuery maxWidth={878}>
            <CelebrityHeader celebrity={celebrity} style={style}/>
          </MediaQuery>

          <MediaQuery minWidth={878}>
            <CelebrityHeader celebrity={celebrity}>
              <div className="celebrity-photo" style={style}>
                <a className="button-primary" href="#purchase_form">{t.actions.buy}</a>
              </div>
            </CelebrityHeader>
          </MediaQuery>

          <div className="main-container">
            <div className="celebrity-info">
              <h3>{t.titles.country}</h3>
              <p>{celebrity.user.country.name}</p>

              <h3>{t.titles.bio}</h3>
              <p>{celebrity.biography}</p>
            </div>
            <div className="request-form">
              <MessageRequest
                celebrity={celebrity}
                message_request_url={message_request_url}
                t={t.message_request}
                uyapAtad={uyapAtad}
              />
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default CelebrityProfile
