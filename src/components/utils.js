function renderLoading(evt, isLoading) {
    const object = evt.target.querySelector(".popup__save-button")
    if(isLoading) {
      object.textContent = 'Сохранение...'
    } else {
      object.innerText = object.dataset.name
    }
  }

export { renderLoading }