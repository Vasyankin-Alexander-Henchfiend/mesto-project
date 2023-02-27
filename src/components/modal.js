const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
};

const closeByEscape = (evt) => {
    if (evt.key === "Escape") {
        const popupOpen = document.querySelector('.popup_opened');
        closePopup(popupOpen);
    };
};

const closeByButtonOrOverlay = () => {
    const popups = document.querySelectorAll('.popup')

    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popup)
            };
            if (evt.target.classList.contains('popup__close-icon')) {
              closePopup(popup)
            };
        });
    });
};

export { openPopup, closePopup, closeByEscape, closeByButtonOrOverlay };