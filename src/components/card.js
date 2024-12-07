import {deleteCardFromServer, likeCard, unlikeCard} from "./api";

export const createCard = (cardTemplate, cardInfo, deleteCard, likeHandler, imageHandler, profileId) => {
    const cardElement = cardTemplate.cloneNode(true)
    const cardDeleteButton = cardElement.querySelector(".card__delete-button")
    const cardImage = cardElement.querySelector(".card__image")
    const cardTitle = cardElement.querySelector(".card__title")
    const cardLikeButton = cardElement.querySelector(".card__like-button")
    const cardLikeCount = cardElement.querySelector(".card__like-count")
    const cardContainer = cardElement.querySelector('li')


    if (!isMyCard(profileId, cardInfo.owner._id)) {
        removeDeleteButton(cardDeleteButton)
    }

    if (cardInfo.likes.some(likes => likes._id === profileId)) {
        cardLikeButton.classList.add('card__like-button_is-active')
    }

    cardImage.src = cardInfo.link
    cardImage.alt = cardInfo.name
    cardTitle.textContent = cardInfo.name
    cardLikeCount.textContent = cardInfo.likes.length

    cardContainer.id = cardInfo._id
    cardLikeButton.addEventListener("click", likeHandler)
    cardDeleteButton.addEventListener("click", deleteCard)
    cardImage.addEventListener("click", imageHandler)

    return cardElement
}

export const deleteCard = (evt) => {
    const card = evt.target.closest(".places__item")
    deleteCardFromServer(card.id)

    return card.remove()
}

export const handleLike = (evt) => {
    const card = evt.target.closest(".places__item")
    const likeButton = evt.target
    const likeCountElement = card.querySelector('.card__like-count')
    let likeCount = Number(likeCountElement.textContent)

    if (likeButton.classList.contains('card__like-button_is-active')) {
        unlikeCard(card.id)
        likeCountElement.textContent = likeCount - 1
    } else {
        likeCard(card.id)
        likeCountElement.textContent = likeCount + 1
    }


    return evt.target.classList.toggle("card__like-button_is-active")
}

const removeDeleteButton = (cardDeleteButton) => {
    cardDeleteButton.remove()
}

const isMyCard = (myId, cardOwnerId) => {
    return myId === cardOwnerId
}