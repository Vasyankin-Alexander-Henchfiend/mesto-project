import { openPopup, closePopup } from "./modal.js";

const popupImage = document.querySelector(".popup_type_image");
const popupImagePic = popupImage.querySelector(".popup__image");
const popupImageCap = popupImage.querySelector(".popup__caption");
const popupAddElement = document.querySelector(".popup_type_add-element");
const elementsContainer = document.querySelector(".elements");
const addForm = document.forms.addForm;
const name = addForm.elements.imageName;
const link = addForm.elements.imageSource;

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

const renderInitialCards = (cards) => {
  cards.forEach((card) => {
    const element = createCard(card.name, card.link);
    elementsContainer.append(element);
  });
};

const addCard = (evt) => {
  evt.preventDefault();

  const cardElement = createCard(name.value, link.value);

  elementsContainer.prepend(cardElement);
  postNewCard(name.value, link.value);
  closePopup(popupAddElement);

  evt.target.reset();
};

function postNewCard(name, link) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-20/cards", {
    method: "POST",
    headers: {
      authorization: "2286b0f6-c117-40dd-b074-20134fb23036",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
};

export { createCard, renderInitialCards, addCard, addForm };
