import React         from 'react'
import AliceCarousel from 'react-alice-carousel'

import 'react-alice-carousel/lib/alice-carousel.css'

const handleOnDragStart = e => e.preventDefault()

const defaultProps = {
  dotsDisabled: true,
  infinite: false,
  stagePadding: {
    paddingRight: 100
  },
  responsive: {
    0: {
      items: 1
    },
    1024: {
      items: 2
    }
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

      return (
        <AliceCarousel mouseDragEnabled startIndex={indexOfItem || 0} {...carouselProps}>
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
