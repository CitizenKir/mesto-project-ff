import './styles/index.css';
import {initialCards} from "./cards"
import { createCard, deleteCard, handleLike} from "./components/card";
import { openPopup, closePopup, keyHandler, overlayClickHandler} from "./components/popup";

const cardTemplate = document.querySelector("#card-template").content
const placesList = document.querySelector(".places__list")

//попап редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button")
const profileEditPopup = document.getElementById('profile_edit')
const profileEditCloseButton = profileEditPopup.querySelector('.popup__close')

//попап создания карточки
const profileAddButton = document.querySelector(".profile__add-button")
const profileAddPopup = document.getElementById('profile_add')
const profileAddCloseButton = profileAddPopup.querySelector('.popup__close')

//попап с детальным изображением
const imageDetail = document.getElementById('image_detail')
const imageDetailCloseButton = imageDetail.querySelector('.popup__close')
const imageElement = imageDetail.querySelector('.popup__image')
const imageCaption = imageDetail.querySelector('.popup__caption')

//форма редактирования профиля внутри попапа
const formProfileEdit = document.forms.profileEdit
const formAddCard = document.forms.newPlace

//инпуты внутри формы редактирования профиля
const nameInput = formProfileEdit.name
const jobInput = formProfileEdit.description

//элементы имени и описания профиля на странице, текстовый контент которых может быть перезаписан в форме
const profileName = document.querySelector(".profile__title")
const profileDescription = document.querySelector(".profile__description")

nameInput.value = profileName.textContent
jobInput.value = profileDescription.textContent

const renderCard = (cardInfo) => {
    const cardElement = createCard(cardTemplate, cardInfo, deleteCard, handleLike, openImage)

    placesList.prepend(cardElement)
}

const openImage = (evt) => {
    imageElement.src = evt.target.currentSrc
    imageElement.alt = evt.target.alt
    imageCaption.textContent = evt.target.alt

    openPopup(imageDetail, imageDetailCloseButton, overlayClickHandler, keyHandler)
}

const handleProfileEdit = (evt) => {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileDescription.textContent = jobInput.value

    closePopup(profileEditPopup)
}

const handleAddCard = (evt) => {
    evt.preventDefault()
    const placeName = formAddCard.placeName.value
    const imageUrl = formAddCard.link.value

    formAddCard.reset()
    closePopup(profileAddPopup)

    return renderCard({
        name: placeName,
        link: imageUrl
    })
}

initialCards.map((card) => renderCard(card))

profileEditButton.addEventListener('click', function () {
    openPopup(profileEditPopup, profileEditCloseButton, overlayClickHandler, keyHandler)
})
profileAddButton.addEventListener('click', function () {
    openPopup(profileAddPopup, profileAddCloseButton, overlayClickHandler, keyHandler)
})

formProfileEdit.addEventListener('submit', handleProfileEdit)
formAddCard.addEventListener('submit', handleAddCard)
