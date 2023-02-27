import { openPopup, closePopup } from "./modal.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupImage = document.querySelector(".popup_type_image");
const popupImagePic = popupImage.querySelector(".popup__image");
const popupImageCap = popupImage.querySelector(".popup__caption");
const popupAddElement = document.querySelector(".popup_type_add-element");
const elementsContainer = document.querySelector(".elements");
const addForm = document.forms.addForm;
const name = addForm.elements.imageName;
const source = addForm.elements.imageSource;

const createCard = (name, source) => {
  const elementTemplate = document.querySelector("#element-template").content;
  const element = elementTemplate.querySelector(".element");
  const cardElement = element.cloneNode(true);
  const cardElemenImage = cardElement.querySelector(".element__image");

  cardElement.querySelector(".element__title").textContent = name;
  cardElemenImage.src = source;
  cardElemenImage.alt = name;

  cardElement
    .querySelector(".element__delete")
    .addEventListener("click", () => {
      cardElement.remove();
    });

  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-button_active");
    });

  cardElemenImage.addEventListener("click", () => {
    popupImagePic.src = cardElemenImage.src;
    popupImagePic.alt = cardElemenImage.alt;
    popupImageCap.textContent = cardElemenImage.alt;

    openPopup(popupImage);
  });

  return cardElement;
};

const renderInitialCards = () => {
  initialCards.forEach((item) => {
    const element = createCard(item.name, item.link);
    elementsContainer.append(element);
  });
};

const addCard = (evt) => {
  evt.preventDefault();

  const cardElement = createCard(name.value, source.value);

  elementsContainer.prepend(cardElement);
  closePopup(popupAddElement);

  evt.target.reset();
};

export { createCard, renderInitialCards, addCard, addForm };
