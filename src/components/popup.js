const currentHandlers = {
    close: closePopup,
    overlayClickHandler: null,
    keyHandler: null
}

export const openPopup = (popupElement, closeButton, overlayClickHandler, keyHandler) => {

    closeButton.addEventListener('click', function () {
        closePopup(popupElement)
    })
    popupElement.addEventListener("mousedown", overlayClickHandler)
    document.addEventListener("keydown", keyHandler)

    currentHandlers.overlayClickHandler = overlayClickHandler
    currentHandlers.keyHandler = keyHandler

    popupElement.classList.add('popup_is-opened')
}

export const closePopup = (popup) => {
    document.removeEventListener("keydown", currentHandlers.keyHandler)
    popup.removeEventListener("click", currentHandlers.close)
    popup.removeEventListener("mousedown", currentHandlers.overlayClickHandler)

    popup.classList.remove('popup_is-opened')
}

export const overlayClickHandler = (evt) => {
    if (evt.target.classList.contains('popup')) {
        const activePopup = document.querySelector(".popup_is-opened")
        closePopup(activePopup)
    }
}

export const keyHandler = (evt) => {
    if (evt.code === 'Escape') {
        const activePopup = document.querySelector(".popup_is-opened")
        closePopup(activePopup)
    }
}

export const renderLoading = (buttonElement, isLoading) => {
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...'
    } else if (isLoading === false) {
        buttonElement.textContent = 'Сохранить'
    }
}
