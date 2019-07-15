import React from 'react'

import MessageRequest from 'components/celebrities/MessageRequest'

class CelebrityProfile extends React.Component {
  render() {
    const {
      celebrity,
      message_request_url,
      t
    } = this.props

    return (
      <div className="celebrity-profile">
        <div className="celebrity-header" style={{backgroundImage: `url(${celebrity.user.photo})`}}>
          <h1>{celebrity.user.known_as}</h1>
          <h4>@falcao</h4>
        </div>
        <div className="main-container">
          <div className="celebrity-info">
            <h3>País de origen</h3>
            <p>{celebrity.user.country.name}</p>

            <h3>Bio</h3>
            <p>{celebrity.biography}</p>
          </div>
        </div>

        <MessageRequest
          celebrity_id={celebrity.id}
          message_request_url={message_request_url}
          t={t.message_request}
        />
      </div>
    )
  }
}

export default CelebrityProfile
