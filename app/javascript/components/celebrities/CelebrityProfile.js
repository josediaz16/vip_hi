import React from 'react'

import MessageRequest from 'components/celebrities/MessageRequest'
import Footer         from 'components/footer'
import Icon           from 'components/inputs/Icon'

class CelebrityProfile extends React.Component {
  render() {
    const {
      celebrity,
      message_request_url,
      t
    } = this.props

    return (
      <React.Fragment>
        <div className="celebrity-profile">
          <div className="celebrity-header" style={{backgroundImage: `url(${celebrity.user.photo})`}}>

            <a href="/celebrities" className="hide-on-mobile">
              <Icon icon="arrow-13" className="back"/>
            </a>

            <h1>{celebrity.user.known_as}</h1>
            <h4>{celebrity.handle}</h4>
          </div>
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
