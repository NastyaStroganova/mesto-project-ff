const cardTemplate = document.querySelector('#card-template').content;

export function addCard(cardData, deleteCard, likeCard, handleOpenImage) {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener('click', (evt) => {
    likeCard(evt);
  });

  cardImage.addEventListener('click', () => {
    handleOpenImage({
      name: cardData.name,
      link: cardData.link,
  });
  });

  return cardElement;
};

export function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export function deleteCard (cardElement) {
  cardElement.remove();
};