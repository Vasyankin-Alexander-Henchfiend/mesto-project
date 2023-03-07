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

import {
  getCards,
  getProfileInfo,
  patchProfileInfo,
} from "./components/api.js";
getCards()
  .then((cards) => {
    renderInitialCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });
getProfileInfo()
  .then((data) => {
    profileName.textContent = data.name;
    profileStatus.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch((err) => {
    console.log(err);
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
  patchProfileInfo(nameInput.value, jobInput.value).catch((err) => {
    console.log(err);
  });
  closePopup(popupEditProfile);
};

profileForm.addEventListener("submit", handleProfileFormSubmit);

/********************************API***********************************/

