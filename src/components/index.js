import { initialCards } from './cards.js';
import '../pages/index.css';
import { addCard } from './cards.js';
import { handleEscKeyUp } from './modal.js';
import { popupOpen } from './modal.js';
import { popupClose } from './modal.js';
import { likeCard } from './cards.js';
import { deleteCard } from './cards.js';


const cardsList = document.querySelector('.places__list');
const page = document.querySelector('.page__content');
const content = page.querySelector('.content');
const profile = content.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const editButton = profileInfo.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popup = document.querySelector('.popup');
const popupNewCard = document.querySelector('.popup_type_new-card');
const addButton = profile.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup_type_image');
const popupImageOpened = imagePopup.querySelector('.popup__image');
const popupImageCaption = imagePopup.querySelector('.popup__caption');
const formEdit = document.forms['edit-profile'];
const inputName = formEdit.elements['name'];
const inputDescription = formEdit.elements['description'];
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');
const formAddNewCard = document.forms['new-place'];
const inputPlaceName = formAddNewCard.elements['place-name'];
const inputLink = formAddNewCard.elements['link'];

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

//отдельная функция функцияЧтобыПовеситьСлушатели
const functionAddEventListener = (popupElement) => {
  const popupCloseButton = popupElement.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => {
    popupClose(popupElement); 
  });
  
  //закрываем попап по оверлэю
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      popupClose(popupElement)
    }
  });
};

//открываем попап редактирования профиля с инпутами из разметки
editButton.addEventListener('click', () => {
    // Возьмём данные из разметки и запишем в инпуты 
    inputName.value = profileTitle.textContent;
    inputDescription.value = profileDescription.textContent;
  popupOpen(popupEdit);
});

//функция редактирования (попап редактирования профиля)
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popupClose(popupEdit);
};

//обработчик отправки формы (редактировать профиль)
formEdit.addEventListener('submit', handleFormSubmit);

function addNewCard (evt) {
  evt.preventDefault();
  const newCardData =
    {
      name: inputPlaceName.value,
      link: inputLink.value,
    };

  const newCard = addCard(newCardData, deleteCard, likeCard, handleOpenImage);
  cardsList.prepend(newCard);
  popupClose(popupNewCard);
  formAddNewCard.reset();
};

formAddNewCard.addEventListener('submit', addNewCard);

//слушатель, чтобы отркыть попап - создания новой карточки
addButton.addEventListener('click', () => {
  popupOpen(popupNewCard);
});

Array.from(document.querySelectorAll('.popup')).forEach(popup => {
  popup.classList.add('.popup_is-animated');
  functionAddEventListener(popup);
});
