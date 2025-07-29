const cardTemplate = document.querySelector('#card-template').content;

export function addCard(cardData, userId, handleDelete, handleOpenImage, handleLikeIconClick) {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likesCount = cardElement.querySelector('.card__likes-counter');

  cardImage.src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.alt = cardData.name;

  likesCount.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some((like) => like._id === userId);
   if (isLiked) { 
    likeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  }
   deleteButton.addEventListener('click', () => {
  handleDelete(cardData._id, cardElement)
});

  likeButton.addEventListener('click', () => {
    handleLikeIconClick(cardData._id, likeButton, likesCount);
  }); 

  cardImage.addEventListener('click', () => {
    handleOpenImage({
      name: cardData.name,
      link: cardData.link,
  });
  });

  return cardElement;
};

export const handleLikeIconClick = (toggleLike) => (cardID, likeButton, likesCount) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active"); // определяем окрашена ли уже карточка
  toggleLike(cardID, !isLiked)
    .then((cardData) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likesCount.textContent = cardData.likes.length;
    })
    .catch((err) => console.log(`Ошибка изменения статуса лайка: ${err}`));
};

const updateLikes = (cardD, cardId, likeButton, likesCount) => {

}

export function deleteCard (cardElement) {
  cardElement.remove();
};
