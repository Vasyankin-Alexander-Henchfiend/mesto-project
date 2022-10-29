let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-icon');

let profileForm = document.querySelector('.profile__info');
let profileName = profileForm.querySelector('.profile__title');
let profileStatus = profileForm.querySelector('.profile__subtitle');

function popupOpened () {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', popupOpened);

function popupClosed () {
    popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', popupClosed);


const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#status');

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
  
// Получите значение полей jobInput и nameInput из свойства value
// Выберите элементы, куда должны быть вставлены значения полей 
// Вставьте новые значения с помощью textContent

}

formElement.addEventListener('submit', formSubmitHandler);