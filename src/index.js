import './pages/index.css';

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
  
  const elementsContainer = document.querySelector('.elements');
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element');
  const cardElement = element.cloneNode(true);
  const cardElemenImage = cardElement.querySelector('.element__image');
  /*дурацкая константа здесь*/ 
  const popups = document.querySelectorAll('.popup');
  const popupImage = document.querySelector('.popup_type_image');
  const popupCloseButtons = document.querySelectorAll('.popup__close-icon');
  const editButton = document.querySelector('.profile__edit-button');
  const popupEditProfile = document.querySelector('.popup_type_edit-profile');
  const profile = document.querySelector('.profile__info');
  const profileName = profile.querySelector('.profile__title');
  const profileStatus = profile.querySelector('.profile__subtitle');
  const profileForm = document.forms.editForm;
  const nameInput = profileForm.elements.name;
  const jobInput = profileForm.elements.status;
  const addButton = document.querySelector('.profile__add-button');
  const popupAddElement = document.querySelector('.popup_type_add-element');
  const addForm = document.forms.addForm;
  const name = addForm.elements.imageName;
  const source = addForm.elements.imageSource;
  
  
  const popupImagePic = popupImage.querySelector('.popup__image');
  const popupImageCap = popupImage.querySelector('.popup__caption');
  
  /*работа с модальными окнами */
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

  popupCloseButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });
  

/*можно проще но хз как*/
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === item) {
      closePopup(item)
    }
  })
}) 

//////////////////////////////////////////////////////////////////////////
  
  editButton.addEventListener("click", function () {
    nameInput.value = profileName.textContent.trim();
    jobInput.value = profileStatus.textContent.trim();
    openPopup(popupEditProfile);
  });
  
  addButton.addEventListener('click',  function() {
    openPopup(popupAddElement)
  });
  
  function createCard(name, source) {
    const cardElement = element.cloneNode(true);
    const cardElemenImage = cardElement.querySelector('.element__image');
  
    cardElement.querySelector('.element__title').textContent = name;
    cardElemenImage.src = source;
    cardElemenImage.alt = name;
  
    cardElement.querySelector('.element__delete').addEventListener('click', function(evt) { cardElement.remove() });
    
    cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
     evt.target.classList.toggle('element__like-button_active');
    });
  
    cardElemenImage.addEventListener('click', () => {
      popupImagePic.src = cardElemenImage.src
      popupImagePic.alt = cardElemenImage.alt
      popupImageCap.textContent = cardElemenImage.alt
      
      openPopup(popupImage)
    });
  
    return cardElement;
  };
  
  initialCards.forEach((item) => { 
    const element = createCard(item.name, item.link)
    elementsContainer.append(element); 
  });
  
  function addCard(evt) {
    evt.preventDefault(); 
    
    const cardElement = createCard(name.value, source.value)
    
    elementsContainer.prepend(cardElement); 
    closePopup(popupAddElement);
    
    evt.target.reset()
  };
    
  addForm.addEventListener('submit', addCard);
  
  function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    closePopup(popupEditProfile);
  };
  
  profileForm.addEventListener('submit', handleProfileFormSubmit);
  
  
  //////////////////////////////////////////////
  /*Тупо валидация */
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__form-input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__form-input-error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__form-input_type_error');
    errorElement.classList.remove('popup__form-input-error_active');
    errorElement.textContent = '';
  };
  
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__save-button_inactive');
    } else {
      buttonElement.classList.remove('popup__save-button_inactive'); 
    }
  }
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      
      setEventListeners(formElement);
    });
  };
  
  enableValidation();
  /////////////////////////////////////////////