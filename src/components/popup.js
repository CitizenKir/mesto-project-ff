const currentHandlers = {
    close: closePopup,
    overlayClickHandler: null,
    keyHandler: null
}

export const openPopup = (popupElement, overlayClickHandler, keyHandler) => {
    const closeButton = popupElement.querySelector('.popup__close')

    closeButton.addEventListener('click', closePopup)
    popupElement.addEventListener("mousedown", overlayClickHandler)
    document.addEventListener("keydown", keyHandler)

    currentHandlers.overlayClickHandler = overlayClickHandler
    currentHandlers.keyHandler = keyHandler

    return popupElement.classList.add('popup_is-opened')
}

export const closePopup = () => {
    const popup = document.querySelector(".popup_is-opened")

    document.removeEventListener("keydown", currentHandlers.keyHandler)
    popup.removeEventListener("click", currentHandlers.close)
    popup.removeEventListener("mousedown", currentHandlers.overlayClickHandler)

    return popup.classList.remove('popup_is-opened')
}