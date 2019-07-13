import React from 'react'

const CelebrityCard = ({name, known_as, country, biography, price, photo_url, detail_path}) => {
  return (
    <div className="celebrity-card" onClick={() => window.location.assign(detail_path) }>
      <div className="profile-image" style={{backgroundImage: `url(${photo_url})`}}>
        <span className="price-tag">
          350.000 Cop
        </span>
      </div>
      <div className="profile-info">
        <h5 className="country-name">{country}</h5>
        <h3 className="celebrity-name">{known_as}</h3>
        <h4 className="screen-name">@falcao9</h4>
        <p className="bio">{biography}</p>
      </div>
    </div>
  )
}

export default CelebrityCard
