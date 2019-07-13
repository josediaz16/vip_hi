import React from 'react'
import CarouselSlider from './CarouselSlider'
import CelebrityCard  from 'components/celebrities/CelebrityCard'

const CustomCarousel = CarouselSlider(CelebrityCard)

const CelebrityCarousel = ({items}) => {
  return (
    <CustomCarousel
      items={items}
    />
  )
}

export default CelebrityCarousel
