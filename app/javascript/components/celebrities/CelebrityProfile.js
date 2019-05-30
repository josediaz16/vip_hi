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
      <div>
        <h2>{celebrity.user.known_as}</h2>
        <img src={celebrity.user.photo} style={{width: "200px", height: "200px"}}/>
        <p>{celebrity.biography}</p>

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
