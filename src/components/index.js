import '../pages/index.css';
import { addCard, handleLikeIconClick } from './card.js';
import { popupOpen } from './modal.js';
import { popupClose } from './modal.js';
import { functionAddEventListener } from './modal.js';
import { likeCard } from './card.js';
import { enableValidation } from './validation.js';
import { clearValidation } from './validation.js';
import { getInitialCards } from './api.js';
import { getUserData } from './api.js';
import { updateProfile } from './api.js';
import { createNewCard } from './api.js';
import { toggleLike } from './api.js';
import { deleteCard } from './api.js';

 

const cardsList = document.querySelector('.places__list');
const page = document.querySelector('.page__content');
const content = page.querySelector('.content');
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const editButton = profileInfo.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const addButton = profile.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup_type_image');
const popupImageOpened = imagePopup.querySelector('.popup__image');
const popupImageCaption = imagePopup.querySelector('.popup__caption');
const formProfile = document.forms['edit-profile'];
const inputNameFormProfile = formProfile.elements['name'];
const inputDescriptionFormProfile = formProfile.elements['description'];
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const formAddNewCard = document.forms['new-place'];
const inputPlaceNameFormAddNewCard = formAddNewCard.elements['place-name'];
const inputlinkFormAddNewCard = formAddNewCard.elements['link'];
const onLikeClick = handleLikeIconClick(toggleLike);
const popupAvatar = document.querySelector('.popup_type_avatar');
const avatarEditButton = document.querySelector('.profile__image-edit-button');
const formAvatar = document.forms['avatar-form'];
const inputAvatar = formAvatar.elements['avatar'];
const profileAvatar = document.querySelector('.profile__image');


function handleOpenImage ({name, link}) {
  popupImageOpened.src = link;
  popupImageOpened.alt = name;
  popupImageCaption.textContent = name;
  popupOpen(imagePopup);
};

const handleDelete = (cardElement, cardId) => {
  deleteCard(cardId)
  .then(() => {
    cardElement.remove()
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
   }); 
  };

//функция редактирования (попап редактирования профиля)
function handleFormProfileSubmit (evt) {
  evt.preventDefault();

  updateProfile({name: inputNameFormProfile.value, about: inputDescriptionFormProfile.value})
  .then((updatedProfile) => {
    profileTitle.textContent = updatedProfile.name;
    profileDescription.textContent = updatedProfile.about;
    popupClose(popupEdit);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
   }); 
  // profileTitle.textContent = inputNameFormProfile.value;
  // profileDescription.textContent = inputDescriptionFormProfile.value;
  // popupClose(popupEdit);
};

function handleFormAddNewCard (evt) {
  evt.preventDefault();

  createNewCard({name: inputPlaceNameFormAddNewCard.value, link: inputlinkFormAddNewCard.value}) 
   .then((newCardData) => {
    const newCard = addCard(newCardData, user._id, handleDelete, handleOpenImage, onLikeClick);
    cardsList.prepend(newCard);
    popupClose(popupNewCard);
    formAddNewCard.reset();
  })
  .catch((err) => {
   console.log('Ошибка. Запрос не выполнен: ', err);
 })
};


//открываем попап редактирования профиля с инпутами из разметки
editButton.addEventListener('click', () => {
  // Возьмём данные из разметки и запишем в инпуты 
  inputNameFormProfile.value = profileTitle.textContent;
  inputDescriptionFormProfile.value = profileDescription.textContent;
  formProfile.reset();
  clearValidation(formProfile, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  popupOpen(popupEdit);
});

formAddNewCard.addEventListener('submit', handleFormAddNewCard);
//were// formAddNewCard.addEventListener('submit', addNewCard);

//слушатель, чтобы отркыть попап - создания новой карточки
addButton.addEventListener('click', () => {
  popupOpen(popupNewCard);
  formAddNewCard.reset();
});


//обработчик отправки формы (редактировать профиль)
formProfile.addEventListener('submit', handleFormProfileSubmit);


Array.from(document.querySelectorAll('.popup')).forEach(popup => {
  popup.classList.add('.popup_is-animated');
  functionAddEventListener(popup);
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 


Promise.all([getUserData(), getInitialCards()])
.then(([user, cards]) => {
  console.log('Данные пользователя:', user);
  console.log('Полученные карточки', cards);
  cards.forEach((cardData) => {
    const cardElement = addCard(cardData, user._id, handleDelete, handleOpenImage, onLikeClick);
    cardsList.append(cardElement);
  });
  
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;

  if (user.avatar) {
    profileAvatar.style.backgroundImage = `url('${user.avatar}')`;
  }
})
 .catch((err) => {
 console.log('Ошибка. Запрос не выполнен: ', err);
}); 

avatarEditButton.addEventListener('click', () => {
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
  popupOpen(popupAvatar);
});

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  
  updateAvatar(inputAvatar.value)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
      popupClose(popupAvatar);
    })
    .catch(err => {
      console.error('Ошибка обновления аватара:', err);
      alert('Не удалось обновить аватар');
    })
    .finally(() => {
      submitButton.textContent = initialText;
    });
}

formAvatar.addEventListener('submit', handleAvatarSubmit);






