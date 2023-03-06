import { openPopup, closePopup } from "./modal.js";

const popupImage = document.querySelector(".popup_type_image");
const popupImagePic = popupImage.querySelector(".popup__image");
const popupImageCap = popupImage.querySelector(".popup__caption");
const popupAddElement = document.querySelector(".popup_type_add-element");
const elementsContainer = document.querySelector(".elements");
const addForm = document.forms.addForm;
const name = addForm.elements.imageName;
const link = addForm.elements.imageSource;

const createCard = (card) => {
  const elementTemplate = document.querySelector("#element-template").content;
  const element = elementTemplate.querySelector(".element");
  const cardElement = element.cloneNode(true);
  const cardElementTitle = cardElement.querySelector(".element__title");
  const cardElemenImage = cardElement.querySelector(".element__image");

  cardElementTitle.textContent = card.name;
  cardElemenImage.src = card.link;
  cardElemenImage.alt = card.name;

  cardElement
    .querySelector(".element__delete")
    .addEventListener("click", () => {
      deleteCard(card._id)
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
    const element = createCard(card);
    elementsContainer.append(element);
  });
};

const addCard = (evt) => {
  evt.preventDefault();

  postNewCard(name.value, link.value)
    .then((card) => {
      evt.target.reset();
      elementsContainer.prepend(createCard(card));
      closePopup(popupAddElement);
    })
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
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};

function deleteCard(cardId) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-20/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "2286b0f6-c117-40dd-b074-20134fb23036",
      "Content-Type": "application/json",
    }
  })
};

export { createCard, renderInitialCards, addCard, addForm };
