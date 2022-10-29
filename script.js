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