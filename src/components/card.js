import { openPopup, closePopup } from "./modal.js";
import { postNewCard, deleteCard, putLike, deleteLike } from "./api.js";
import { renderLoading } from "./utils.js";

const popupImage = document.querySelector(".popup_type_image");
const popupImagePic = popupImage.querySelector(".popup__image");
const popupImageCap = popupImage.querySelector(".popup__caption");
const popupAddElement = document.querySelector(".popup_type_add-element");
const elementsContainer = document.querySelector(".elements");
const addForm = document.forms.addForm;
const name = addForm.elements.imageName;
const link = addForm.elements.imageSource;

const createCard = (card, myId) => {
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

  if (card.owner._id === myId) {
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
  
  card.likes.forEach((like) => {
    if(like._id === myId) {
      cardElementLike.classList.add("element__like-button_active")
    }
  })

  cardElementLike.addEventListener("click", (evt) => {
    if(!(evt.target.classList.contains("element__like-button_active"))) {
      putLike(card._id)
      .then((res) => {
        evt.target.classList.add("element__like-button_active");
        cardElementLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      deleteLike(card._id)
      .then((res) => {
        evt.target.classList.remove("element__like-button_active")
        cardElementLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    }
  });

  cardElemenImage.addEventListener("click", () => {
    popupImagePic.src = cardElemenImage.src;
    popupImagePic.alt = cardElemenImage.alt;
    popupImageCap.textContent = cardElemenImage.alt;

    openPopup(popupImage);
  });

  return cardElement;
};

const renderInitialCards = (cards, id) => {
  cards.forEach((card) => {
    elementsContainer.append(createCard(card, id));
  });
};

const addCard = (evt) => {
  evt.preventDefault();
  renderLoading(evt, true)
  postNewCard(name.value, link.value)
    .then((card) => {
      evt.target.reset();
      elementsContainer.prepend(createCard(card, card.owner._id));
      closePopup(popupAddElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(evt, false)
    });
};

export { createCard, renderInitialCards, addCard, addForm };
