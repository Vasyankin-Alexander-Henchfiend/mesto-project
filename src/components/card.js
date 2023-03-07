import { openPopup, closePopup } from "./modal.js";
import { postNewCard, deleteCard, putLike, deleteLike } from "./api.js";

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
  const cardElementLike = cardElement.querySelector(".element__like-button");
  const cardElementLikeCounter = cardElement.querySelector(
    ".element__like-button-counter"
  );
  const cardElementDelete = cardElement.querySelector(".element__delete");

  cardElementTitle.textContent = card.name;
  cardElemenImage.src = card.link;
  cardElemenImage.alt = card.name;
  cardElementLikeCounter.textContent = card.likes.length;

  if (card.owner._id === "f19165c60933c9701244ac4f") {
    cardElementDelete.addEventListener("click", () => {
      deleteCard(card._id)
        .then(() => cardElement.remove())
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    cardElementDelete.remove();
  }

  cardElementLike.addEventListener("click", (evt) => {
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
    elementsContainer.append(createCard(card));
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
    .catch((err) => {
      console.log(err);
    });
};

export { createCard, renderInitialCards, addCard, addForm };
