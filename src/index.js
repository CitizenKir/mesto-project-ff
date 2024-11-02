import './styles/index.css';
import {initialCards} from "./cards"

const cardTemplate = document.querySelector("#card-template").content
const placesList = document.querySelector(".places__list")

const createCard = (cardInfo, deleteCard) => {
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true)
    const deleteButton = cardElement.querySelector(".card__delete-button")

    cardElement.querySelector(".card__image").src = cardInfo.link
    cardElement.querySelector(".card__image").alt = cardInfo.name
    cardElement.querySelector(".card__title").textContent = cardInfo.name

    deleteButton.addEventListener("click", deleteCard)

    return cardElement
}

const deleteCard = (evt) => {
    const card = evt.target.closest(".places__item")

    return card.remove()
}

const renderCard = (cardInfo) => {
    const cardElement = createCard(cardInfo, deleteCard)

    return placesList.prepend(cardElement)
}

initialCards.map((card) => renderCard(card))