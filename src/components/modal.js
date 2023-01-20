const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
};

const closeByEscape = (evt) => {
    const popupOpen = document.querySelector('.popup_opened');
    if (evt.key === "Escape") {
        closePopup(popupOpen);
    }
};

export {openPopup, closePopup, closeByEscape};