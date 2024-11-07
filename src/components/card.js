export const createCard = (cardTemplate, cardInfo, deleteCard, likeHandler, imageHandler) => {
    const cardElement = cardTemplate.cloneNode(true)
    const cardDeleteButton = cardElement.querySelector(".card__delete-button")
    const cardImage = cardElement.querySelector(".card__image")
    const cardTitle = cardElement.querySelector(".card__title")
    const cardLikeButton = cardElement.querySelector(".card__like-button")

    cardImage.src = cardInfo.link
    cardImage.alt = cardInfo.name
    cardTitle.textContent = cardInfo.name

    cardLikeButton.addEventListener("click", likeHandler)
    cardDeleteButton.addEventListener("click", deleteCard)
    cardImage.addEventListener("click", imageHandler)

    return cardElement
}

export const deleteCard = (evt) => {
    const card = evt.target.closest(".places__item")

    return card.remove()
}

export const handleLike = (evt) => {
    return evt.target.classList.toggle("card__like-button_is-active")
}