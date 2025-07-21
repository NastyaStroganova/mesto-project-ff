const handleEscKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    popupClose(openedPopup);
    }
  };
  
//общая функция закрытия попапа
export function popupClose(modalWindow) {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};

//общая функция для показа модального окна
export function popupOpen(modalWindow) {
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
};

//отдельная функция функцияЧтобыПовеситьСлушатели
export const functionAddEventListener = (popupElement) => {
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