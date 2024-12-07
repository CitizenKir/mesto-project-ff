import './styles/index.css';
import {createCard, deleteCard, handleLike} from "./components/card";
import {closePopup, keyHandler, openPopup, overlayClickHandler, renderLoading} from "./components/popup";
import {clearValidation, enableValidation} from "./components/validation";
import {getInitialCards, getProfile, updateProfile, uploadAvatar, uploadCard} from './components/api.js'

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
const formAvatarEdit = document.forms.avatarEdit

//элементы имени и описания профиля на странице, текстовый контент которых может быть перезаписан в форме
const profileName = document.querySelector(".profile__title")
const profileDescription = document.querySelector(".profile__description")

const profileAvatar = document.querySelector(".profile__image")
const profileAvatarEditPopup = document.getElementById('avatar_edit')
const profileAvatarEditCloseButton = profileAvatarEditPopup.querySelector('.popup__close')

//инпуты внутри формы редактирования профиля
const nameInput = formProfileEdit.name
const jobInput = formProfileEdit.description

let profileId = null

Promise.all([getProfile(), getInitialCards()])
    .then((result) => {
        const profile = result[0]
        const cards = result[1]
        profileId = profile._id

        cards.map((card) => renderCard(card, profileId))
        setProfileInfo(profile)
    })

const setProfileInfo = (profile) => {
    profileName.textContent = profile.name
    profileDescription.textContent = profile.about
    profileAvatar.style.backgroundImage = `url(${profile.avatar})`
}

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input_error-text_active'
}

const renderCard = (cardInfo, profileId) => {
    const cardElement = createCard(cardTemplate, cardInfo, deleteCard, handleLike, openImage, profileId)

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
    const saveButton = profileEditPopup.querySelector('.popup__button')

    renderLoading(saveButton, true)
    updateProfile(nameInput.value, jobInput.value)
        .then((response) => {
            profileName.textContent = response.name
            profileDescription.textContent = response.about
        })
        .finally((res) => {
            renderLoading(saveButton, false)
        })

    closePopup(profileEditPopup)
}

const handleAddCard = (evt) => {
    evt.preventDefault()
    const placeName = formAddCard.placeName.value
    const imageUrl = formAddCard.link.value
    const saveButton = profileAddPopup.querySelector('.popup__button')

    renderLoading(saveButton, true)
    uploadCard(placeName, imageUrl)
        .then((cardResult) => {
            renderCard(cardResult, profileId)
        })
        .finally((res) => {
            renderLoading(saveButton, false)
        })

    formAddCard.reset()
    closePopup(profileAddPopup)
}

const handleAvatarEdit = (evt) => {
    evt.preventDefault()
    const avatarUrl = formAvatarEdit.avatar.value
    const saveButton = formAvatarEdit.querySelector('.popup__button')

    renderLoading(saveButton, true)
    uploadAvatar(avatarUrl)
        .then((response) => {
            profileAvatar.style.backgroundImage = `url(${response.avatar})`
        })
        .finally((res) => {
            renderLoading(saveButton, false)
        })


    formAvatarEdit.reset()
    closePopup(profileAvatarEditPopup)
}

profileEditButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent
    jobInput.value = profileDescription.textContent
    openPopup(profileEditPopup, profileEditCloseButton, overlayClickHandler, keyHandler)
    clearValidation(profileEditPopup.querySelector(validationConfig.formSelector), validationConfig)
})
profileAddButton.addEventListener('click', function () {
    openPopup(profileAddPopup, profileAddCloseButton, overlayClickHandler, keyHandler)
    clearValidation(profileAddPopup.querySelector(validationConfig.formSelector), validationConfig)
})
profileAvatar.addEventListener('click', function () {
    openPopup(profileAvatarEditPopup, profileAvatarEditCloseButton, overlayClickHandler, keyHandler)
    clearValidation(profileAvatarEditPopup.querySelector(validationConfig.formSelector), validationConfig)
})

formProfileEdit.addEventListener('submit', handleProfileEdit)
formAddCard.addEventListener('submit', handleAddCard)
formAvatarEdit.addEventListener('submit', handleAvatarEdit)

enableValidation(validationConfig)

