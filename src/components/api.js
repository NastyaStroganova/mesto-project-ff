
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: 'f3e009ea-6220-45c4-a844-9e477f4354fc',
    'Content-Type': 'application/json'
  }
};

function checkResponse(res) {
  if (res.ok) {
   return res.json();
  }
   return res.json()
     .then((error) => {
        error.httpResponseCode = res.status;
        return Promise.reject(error);
     }
  )};

//получение карточек с сервера (удалить предыдущий спрсоб AddCard)
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(checkResponse)
};


//загрузка информации о пользователе с сервера
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse)
};




//обновление отредактированных данных профиля
export const updateProfile = ({name, about}) => {
 return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: about
  })
})
.then(checkResponse);
};

//добавление новой карточки
export const createNewCard = ({name, link}) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
    name: name,
    link: link
  })
})
.then(checkResponse);
};

export const  toggleLike = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers,
  })
  .then(checkResponse)
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
};

export const updateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(checkResponse)
};