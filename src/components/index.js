import { initialCards } from './cards.js';
import '../pages/index.css';
import { addCard } from './card.js';
import { popupOpen } from './modal.js';
import { popupClose } from './modal.js';
import { functionAddEventListener } from './modal.js';
import { likeCard } from './card.js';
import { deleteCard } from './card.js';


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

initialCards.forEach((item) => {
  addToContainer(cardsList, addCard(item, deleteCard, likeCard, handleOpenImage));
});

function addToContainer (cardsList, cardElement) {
  cardsList.append(cardElement);
};

function handleOpenImage ({name, link}) {
  popupImageOpened.src = link;
  popupImageOpened.alt = name;
  popupImageCaption.textContent = name;
  popupOpen(imagePopup);
};

//функция редактирования (попап редактирования профиля)
function handleFormProfileSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = inputNameFormProfile.value;
  profileDescription.textContent = inputDescriptionFormProfile.value;
  popupClose(popupEdit);
};

function addNewCard (evt) {
  evt.preventDefault();
  const newCardData =
    {
      name: inputPlaceNameFormAddNewCard.value,
      link: inputlinkFormAddNewCard.value,
    };

  const newCard = addCard(newCardData, deleteCard, likeCard, handleOpenImage);
  cardsList.prepend(newCard);
  popupClose(popupNewCard);
  formAddNewCard.reset();
};

//открываем попап редактирования профиля с инпутами из разметки
editButton.addEventListener('click', () => {
  // Возьмём данные из разметки и запишем в инпуты 
  inputNameFormProfile.value = profileTitle.textContent;
  inputDescriptionFormProfile.value = profileDescription.textContent;
popupOpen(popupEdit);
});

formAddNewCard.addEventListener('submit', addNewCard);

//слушатель, чтобы отркыть попап - создания новой карточки
addButton.addEventListener('click', () => {
  popupOpen(popupNewCard);
});


//обработчик отправки формы (редактировать профиль)
formProfile.addEventListener('submit', handleFormProfileSubmit);


Array.from(document.querySelectorAll('.popup')).forEach(popup => {
  popup.classList.add('.popup_is-animated');
  functionAddEventListener(popup);
});

//Наверху файла объявляем переменные
//Затем функции
//Внизу файла реализуем добавление обработчиков.