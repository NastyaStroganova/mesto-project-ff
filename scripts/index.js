const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

initialCards.forEach((item) => {
  addToContainer(cardsList, addCard(item, deleteCard));
});

function addToContainer (cardsList, cardElement) {
  cardsList.append(cardElement);
}

function addCard(cardData, deleteCardCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.name;

  deleteButton.addEventListener('click', () => {
    deleteCardCallback(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

