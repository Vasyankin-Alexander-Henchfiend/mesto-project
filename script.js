//подключаем функцию открытия/закрытия окна редактирования профиля
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-icon');



function popupOpened () {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', popupOpened);

function popupClosed () {
    popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', popupClosed);

//подключаем функцию редактирования информации профиля
let profileForm = document.querySelector('.profile__info');
let profileName = profileForm.querySelector('.profile__title');
let profileStatus = profileForm.querySelector('.profile__subtitle');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#status');

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

//подключаем подгрузку картинок
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];

    //подключаем лайки
    let cardLikeButtons = document.querySelectorAll('.element__like-button');

    function cardLikeButtonActive () {
        target.cardLikeButtons.classList.add('element__like-button_active');
    }
    
    cardLikeButtons.addEventListener('click', cardLikeButtonActive);
