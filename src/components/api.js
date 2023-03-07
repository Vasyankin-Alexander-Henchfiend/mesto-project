const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: "2286b0f6-c117-40dd-b074-20134fb23036",
    "Content-Type": "application/json",
  },
};

const getResOk = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return getResOk(res);
  });
}

getCards()
  .then((cards) => {
    renderInitialCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });

function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return getResOk(res);
  })
}

getProfileInfo()
  .then((data) => {
    profileName.textContent = data.name;
    profileStatus.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

function patchProfileInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    return getResOk(res);
  })
}

function postNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => {
    return getResOk(res);
  });
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return getResOk(res);
  });
}
