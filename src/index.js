import "./pages/index.css";

import {
  openPopup,
  closePopup,
  closeByEscape,
  closeByButtonOrOverlay,
} from "./components/modal.js";
closeByButtonOrOverlay();

import {
  createCard,
  renderInitialCards,
  addCard,
  addForm,
} from "./components/card.js";

import { enableValidation } from "./components/validate.js";
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__form-input-error_active",
});

const editButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const profile = document.querySelector(".profile__info");
const profileName = profile.querySelector(".profile__title");
const profileStatus = profile.querySelector(".profile__subtitle");
const profileAvatar = document.querySelector(".profile__avatar");
const profileForm = document.forms.editForm;
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.status;
const addButton = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_type_add-element");

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileStatus.textContent.trim();
  openPopup(popupEditProfile);
});

addButton.addEventListener("click", () => openPopup(popupAddElement));

addForm.addEventListener("submit", addCard);

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  patchProfileInfo(nameInput.value, jobInput.value);
  closePopup(popupEditProfile);
};

profileForm.addEventListener("submit", handleProfileFormSubmit);





/********************************API***********************************/


function getCards() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-20/cards", {
    headers: {
      authorization: "2286b0f6-c117-40dd-b074-20134fb23036",
    },
  })
    .then((res) => res.json())
    .then((cards) => {
      renderInitialCards(cards);
    });
}

getCards();


function getProfileInfo() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-20/users/me', {
  headers: {
    authorization: '2286b0f6-c117-40dd-b074-20134fb23036'
  }
})
  .then(res => res.json())
  .then((data) => {
    profileName.textContent = data.name;
    profileStatus.textContent = data.about;
    profileAvatar.src = data.avatar;
  }) 
};

getProfileInfo();

function patchProfileInfo(name, about) {
  fetch("https://nomoreparties.co/v1/plus-cohort-20/users/me", {
    method: "PATCH",
    headers: {
      authorization: "2286b0f6-c117-40dd-b074-20134fb23036",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};