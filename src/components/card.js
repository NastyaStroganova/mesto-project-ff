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
  handleDelete(cardElement, cardData._id)
});

  // likeButton.addEventListener('click', () => {
  //   likeCard(cardData._id, likeButton, likesCount);
  // });

  //onLikeClick(cardID, likeButton, likesCount);

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

// deleteButton.addEventListener('click', () => {
//   handleDelete(cardElement, cardData._id)
// });
//export function likeCard (evt) { удалила случайно
  

// export function deleteCard (cardElement) {
//   cardElement.remove();
// };





//Поэтому для загрузки данных пользователя и карточек необходимо воспользоваться
// методом Promise.all(). В него передается массив промисов, которые должны быть 
// выполнены, т.е. наши запросы, а в блок .then мы попадем когда оба запроса 
// будут выполнены. Тем самым это гарантирует, что у нас будет сразу и массив 
// карточек и _id пользователя для их отображения.