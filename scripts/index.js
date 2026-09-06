const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach((card) => console.log(card.name));

const editProfile = document.querySelector(".profile__edit-button");
const modal = document.querySelector("#edit-popup");
const closeButton = modal.querySelector(".popup__close"); //botón de cierre
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);
const profileForm = document.querySelector("#edit-profile-form");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modal);
}

editProfile.addEventListener("click", function () {
  handleOpenEditModal();
});

closeButton.addEventListener("click", function () {
  closeModal(modal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(modal);
}

profileForm.addEventListener("submit", function (event) {
  handleProfileFormSubmit(event);
});
//preguntar si necesito agregar aquí  .content
const cardTemplate = document.querySelector("#card_template");
//etapa 5 imagen grande en ventana emergente
const imagePopup = document.querySelector("#image-popup");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupClose = imagePopup.querySelector(".popup__close"); //etapa 5

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-button"); //♥

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  //etapa 5
  cardImage.addEventListener("click", function () {
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupCaption.textContent = name;
    openModal(imagePopup);
  });

  //etapa 3 darle me gusta ♥ a las tarjetas
  cardLikeBtn.addEventListener("click", function handler() {
    cardLikeBtn.classList.toggle("card__like-button_is-active");
    console.log("like button clicked"); //♥
  });
  //etapa 3 eliminar la tarjeta 🗑️
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", function () {
    const card = cardDeleteBtn.closest(".card");
    card.remove();
  });
  return cardElement;
}
//etapa 5 cerrar imagen grande
imagePopupClose.addEventListener("click", function () {
  closeModal(imagePopup);
});
const containerCards = document.querySelector(".cards__list");

function renderCard(name, link, containerCards) {
  const newCard = getCardElement(name, link);
  containerCards.append(newCard);
}
initialCards.forEach((card) => {
  renderCard(card.name, card.link, containerCards);
});
//entra la segunda etapa
const ButtonAddCard = document.querySelector(".profile__add-button"); // botón +
const newCardModal = document.querySelector("#new-card-popup"); // ventana emergente
const CloseButtonAddCard = newCardModal.querySelector(".popup__close"); //boton x cerrar
const formNewCard = document.querySelector("#new-card-form"); // formulario
const cardNameInput = document.querySelector(".popup__input_type_card-name"); //input del título
const cardLinkInput = document.querySelector(".popup__input_type_url"); //input del enlace

ButtonAddCard.addEventListener("click", function () {
  openModal(newCardModal);
});
CloseButtonAddCard.addEventListener("click", function () {
  closeModal(newCardModal);
});
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const newCard = getCardElement(name, link);
  containerCards.prepend(newCard);
  closeModal(newCardModal);
  formNewCard.reset();
}

formNewCard.addEventListener("submit", function (event) {
  handleCardFormSubmit(event);
});
