//подключаем функцию открытия/закрытия окна редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupEditProfileCloseButton = document.querySelector('#close-edit-form');

editButton.addEventListener('click', function() {
  popupEditProfile.classList.add('popup_opened');
});

popupEditProfileCloseButton.addEventListener('click', function() {
  popupEditProfile.classList.remove('popup_opened');
});


//подключаем функцию редактирования информации профиля
const profileForm = document.querySelector('.profile__info');
const profileName = profileForm.querySelector('.profile__title');
const profileStatus = profileForm.querySelector('.profile__subtitle');

const formElement = document.querySelector('.popup__form_type_edit-form');
const nameInput = formElement.querySelector('.popup__form-input_type_edit-name');
const jobInput = formElement.querySelector('.popup__form-input_type_edit-status');

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  popupEditProfile.classList.remove('popup_opened');
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
    // const cardLikeButtons = document.querySelectorAll('.element__like-button');

    // function cardLikeButtonActive () {
    //     target.cardLikeButtons.classList.add('element__like-button_active');
    // }
    
    // cardLikeButtons.addEventListener('click', cardLikeButtonActive);

//подключаем функцию открытия/закрытия окна добавления картинок
const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_type_add-element');
const popupAddElementCloseButton = document.querySelector('#close-add-form');

addButton.addEventListener('click', function () {
  popupAddElement.classList.add('popup_opened');
});

popupAddElementCloseButton.addEventListener('click', function () {
  popupAddElement.classList.remove('popup_opened');
});



//подключаем функцию добавления картинок
const elements = document.querySelector('.elements');
const elementAddForm = document.querySelector('.popup__form_type_add-form');

function addElement(nameValue, sourceValue) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__title').textContent = nameValue;
  element.querySelector('.element__image').src = sourceValue;
  
  element.querySelector('.element__like-button').addEventListener('click', function (evt) {
     evt.target.classList.toggle('element__like-button_active');
  });
  
elements.prepend(element); 
popupAddElement.classList.remove('popup_opened');
};

elementAddForm.addEventListener('submit', function(evt) {
  evt.preventDefault(); 
  const name = document.querySelector('.popup__form-input_type_add-name');
  const source = document.querySelector('.popup__form-input_type_add-source');

  addElement(name.value, source.value);

  name.value = '';
  source.value = '';
});