import './styles/index.css';
import {initialCards} from "./cards"
import { createCard, deleteCard, handleLike} from "./components/card";
import { openPopup, closePopup} from "./components/popup";

const cardTemplate = document.querySelector("#card-template").content
const placesList = document.querySelector(".places__list")

const profileEditButton = document.querySelector(".profile__edit-button")
const profileEditPopup = document.getElementById('profile_edit')

const profileAddButton = document.querySelector(".profile__add-button")
const profileAddPopup = document.getElementById('profile_add')

const imageDetail = document.getElementById('image_detail')

const formProfileEdit = document.forms.profileEdit
const formAddCard = document.forms.newPlace

const nameInput = formProfileEdit.name
const jobInput = formProfileEdit.description

let profileName = document.querySelector(".profile__title")
let profileDescription = document.querySelector(".profile__description")
nameInput.value = profileName.textContent
jobInput.value = profileDescription.textContent

const renderCard = (cardInfo) => {
    const cardElement = createCard(cardTemplate, cardInfo, deleteCard, handleLike, openImage)

    return placesList.prepend(cardElement)
}

const overlayClickHandler = (evt) => {
    if (evt.target.classList.contains('popup')) {
       return closePopup()
    }
}

const keyHandler = (evt) => {
    if (evt.code === 'Escape') {
       return closePopup()
    }
}

const openImage = (evt) => {
    const imageElement = imageDetail.querySelector('.popup__image')
    const imageCaption = imageDetail.querySelector('.popup__caption')
    imageElement.src = evt.target.currentSrc
    imageElement.alt = evt.target.alt
    imageCaption.textContent = evt.target.alt

   return openPopup(imageDetail, overlayClickHandler, keyHandler)
}

const handleProfileEdit = (evt) => {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileDescription.textContent = jobInput.value

    closePopup()
}

const handleAddCard = (evt) => {
    evt.preventDefault()
    const placeName = formAddCard.placeName.value
    const imageUrl = formAddCard.link.value

    formAddCard.reset()
    closePopup()

    return renderCard({
        name: placeName,
        link: imageUrl
    })
}

initialCards.map((card) => renderCard(card))

profileEditButton.addEventListener('click', function () {
    openPopup(profileEditPopup, overlayClickHandler, keyHandler)
})
profileAddButton.addEventListener('click', function () {
    openPopup(profileAddPopup)
})

formProfileEdit.addEventListener('submit', handleProfileEdit)
formAddCard.addEventListener('submit', handleAddCard)
