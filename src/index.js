import './pages/index.css';


import { openPopup, closePopup, closeByEscape } from './components/modal.js';
import { initialCards, createCard, addCard } from './components/card.js';

import { enableValidation } from './components/validate.js';

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

const elementsContainer = document.querySelector('.elements');
// const elementTemplate = document.querySelector('#element-template').content;
// const element = elementTemplate.querySelector('.element');

/*дурацкая константа здесь*/
const popups = document.querySelectorAll('.popup');
// const popupImage = document.querySelector('.popup_type_image');
const popupCloseButtons = document.querySelectorAll('.popup__close-icon');
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profile = document.querySelector('.profile__info');
const profileName = profile.querySelector('.profile__title');
const profileStatus = profile.querySelector('.profile__subtitle');
const profileForm = document.forms.editForm;
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.status;
const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_type_add-element');
// const addForm = document.forms.addForm;
// const name = addForm.elements.imageName;
// const source = addForm.elements.imageSource;


// const popupImagePic = popupImage.querySelector('.popup__image');
// const popupImageCap = popupImage.querySelector('.popup__caption');

/*работа с модальными окнами */
// const openPopup = (popup) => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEscape);
// };

// const closePopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape);
// };

// const closeByEscape = (evt) => {
//   const popupOpen = document.querySelector('.popup_opened');
//   if (evt.key === "Escape") {
//     closePopup(popupOpen);
//   }
// };

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

/*можно проще но хз как*/
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === item) {
      closePopup(item)
    }
  })
})

//////////////////////////////////////////////////////////////////////////

editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileStatus.textContent.trim();
  openPopup(popupEditProfile);
});

addButton.addEventListener('click', function () {
  openPopup(popupAddElement)
});

// function createCard(name, source) {
//   const cardElement = element.cloneNode(true);
//   const cardElemenImage = cardElement.querySelector('.element__image');

//   cardElement.querySelector('.element__title').textContent = name;
//   cardElemenImage.src = source;
//   cardElemenImage.alt = name;

//   cardElement.querySelector('.element__delete').addEventListener('click', function (evt) { cardElement.remove() });

//   cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
//     evt.target.classList.toggle('element__like-button_active');
//   });

//   cardElemenImage.addEventListener('click', () => {
//     popupImagePic.src = cardElemenImage.src
//     popupImagePic.alt = cardElemenImage.alt
//     popupImageCap.textContent = cardElemenImage.alt

//     openPopup(popupImage)
//   });

//   return cardElement;
// };

initialCards.forEach((item) => {
  const element = createCard(item.name, item.link)
  elementsContainer.append(element);
});

// function addCard(evt) {
//   evt.preventDefault();

//   const cardElement = createCard(name.value, source.value)

//   elementsContainer.prepend(cardElement);
//   closePopup(popupAddElement);

//   evt.target.reset()
// };

addForm.addEventListener('submit', addCard);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);
