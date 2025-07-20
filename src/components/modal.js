export const handleEscKeyUp = (evt) => {
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
