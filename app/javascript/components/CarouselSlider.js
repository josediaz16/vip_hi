import React         from 'react'
import AliceCarousel from 'react-alice-carousel'

import 'react-alice-carousel/lib/alice-carousel.css'

const handleOnDragStart = e => e.preventDefault()

const defaultProps = {
  dotsDisabled: true,
  infinite: false,
  responsive: {
    0: {
      items: 1,
    },
    1024: {
      items: 4
    },
    1600: {
      items: 6
    }
  }
}

const getPadding = () => {
  const width = window.innerWidth
  if (width < 700) {
    return 100
  }
  else {
    return 0
  }
}

function CarouselSlider(BaseComponent) {
  class CustomCarousel extends React.Component {
    render() {
      const {
        items,
        indexOfItem,
        ...otherProps
      } = this.props

      const carouselProps = {...defaultProps, ...otherProps}

      const stagePadding =  {
        paddingRight: getPadding()
      }

      return (
        <AliceCarousel mouseDragEnabled startIndex={indexOfItem || 0} {...carouselProps} stagePadding={stagePadding}>
          {
            items.map((item, index) => {
              return (
                <BaseComponent key={index} onDragStart={handleOnDragStart} {...item}/>
              )
            })
          }
        </AliceCarousel>
      )
    }
  }

  return CustomCarousel
}

export default CarouselSlider
