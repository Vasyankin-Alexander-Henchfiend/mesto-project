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
    };
};

const closeByButton = () => {
    const popupCloseButtons = document.querySelectorAll('.popup__close-icon');
    popupCloseButtons.forEach((button) => {
        const popup = button.closest('.popup');
        button.addEventListener('click', () => closePopup(popup));
    });
};

const closeByOverlay = () => {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((item) => {
        item.addEventListener('click', (evt) => {
            if (evt.target === item) {
                closePopup(item)
            }
        });
    });
};


export { openPopup, closePopup, closeByEscape, closeByButton, closeByOverlay };