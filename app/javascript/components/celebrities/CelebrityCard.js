import React from 'react'

import {Currency} from 'components/format'

const CelebrityCard = ({
  name,
  known_as,
  handle,
  country,
  biography,
  price,
  photo_url,
  detail_path}) => {

  return (
    <div className="celebrity-card" onClick={() => window.location.assign(detail_path) }>
      <div className="profile-image" style={{backgroundImage: `url(${photo_url})`}}>
        <span className="price-tag">
          {Currency(price)}
        </span>
      </div>
      <div className="profile-info">
        <h5 className="country-name">{country}</h5>
        <h3 className="celebrity-name">{known_as}</h3>
        <h4 className="screen-name">{handle}</h4>
        <p className="bio">{biography}</p>
      </div>
    </div>
  )
}

export default CelebrityCard
