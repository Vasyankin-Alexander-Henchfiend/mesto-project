import './pages/index.css';


import { openPopup, closePopup, closeByEscape, closeByButton, closeByOverlay } from './components/modal.js';
import { createCard, initialCards, addCard } from './components/card.js';

closeByButton();
closeByOverlay();

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

// const popupImage = document.querySelector('.popup_type_image');

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


editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileStatus.textContent.trim();
  openPopup(popupEditProfile);
});

addButton.addEventListener('click', function () {
  openPopup(popupAddElement)
});

initialCards.forEach((item) => {
  const element = createCard(item.name, item.link)
  elementsContainer.append(element);
});


addForm.addEventListener('submit', addCard);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);
