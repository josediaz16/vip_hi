import React      from "react"
import classNames from 'classnames'

import Icon from "components/inputs/Icon"

//import CloseButton from 'components/CloseButton'

function withinModal(WrappedComponent, VisibleComponent) {

  class Modal extends React.Component {

    onKeyPress(event) {
      if(event.key === "Escape") {
        this.props.onCloseModal()
      }
    }

    componentDidMount() {
      this.props.isOpen && $("body").addClass("no-scroll")
    }

    componentDidUpdate() {
      const body = $("body")
      body.removeClass("no-scroll")
      this.props.isOpen && body.addClass("no-scroll")
    }

    componentWillUnMount() {
      $("body").removeClass("no-scroll")
    }

    closeButton() {
      const { onCloseModal, closeBtnClass } = this.props

      return (
         <a className={className} onClick={onClick}>
          <Icon icon="cancel"/>
        </a>
      )
    }

    render() {
      const {
        wrapperClass,
        isOpen,
        onCloseModal,
        closeOnBox,
        tabIndex,
        closeOnEsc,
        ...otherProps
      } = this.props

      const modalClass = classNames({"generic-modal": true, "open-modal": isOpen}, wrapperClass)
      const onKeyDown = closeOnEsc ? this.onKeyPress.bind(this) : undefined
      const closeButton = closeOnBox ? this.closeButton() : undefined

      return (
        <React.Fragment>
          <div className={modalClass} tabIndex={tabIndex} onKeyDown={onKeyDown}>
            <WrappedComponent
              {...otherProps}
              closeModal={onCloseModal}
              closeButton={closeButton}
            >
            </WrappedComponent>

            { !closeOnBox && onCloseModal && this.closeButton() }
          </div>

           { VisibleComponent && <VisibleComponent openModal={this.openModal} {...otherProps}/> }
        </React.Fragment>
      )
    }
  }

  return Modal
}

export default withinModal
