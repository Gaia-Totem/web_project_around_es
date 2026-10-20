
import { Card, type CardData } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";

// Datos iniciales de las tarjetas
const initialCards: CardData[] = [
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

// Información del perfil
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// Popup para mostrar imágenes grandes
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// Sección donde se mostrarán las tarjetas
const cardSection = new Section<CardData>(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        "#card_template",
        (name, link) => {
          imagePopup.open(link, name);
        }
      );

      cardSection.addItem(card.generateCard());
    },
  },
  ".cards__list"
);

// Crear y mostrar las tarjetas iniciales
cardSection.renderItems();

// Validación del formulario de perfil
const profileFormElement =
  document.querySelector<HTMLFormElement>("#edit-profile-form");

if (!profileFormElement) {
  throw new Error("No se encontró el formulario del perfil");
}

const profileValidator = new FormValidator(
  defaultFormConfig,
  profileFormElement
);

profileValidator.enableValidation();

// Validación del formulario de nuevas tarjetas
const newCardFormElement =
  document.querySelector<HTMLFormElement>("#new-card-form");

if (!newCardFormElement) {
  throw new Error("No se encontró el formulario de nuevas tarjetas");
}

const newCardValidator = new FormValidator(
  defaultFormConfig,
  newCardFormElement
);

newCardValidator.enableValidation();

// Popup para editar el perfil
let profilePopup: PopupWithForm;

profilePopup = new PopupWithForm(
  (inputValues) => {
    userInfo.setUserInfo({
      name: inputValues.name ?? "",
      job: inputValues.description ?? "",
    });

    profilePopup.close();
  },
  "#edit-popup"
);

profilePopup.setEventListeners();

// Popup para agregar tarjetas
const newCardPopup = new PopupWithForm(
  (inputValues) => {
    const cardData: CardData = {
      name: inputValues["place-name"] ?? "",
      link: inputValues.link ?? "",
    };

    const card = new Card(
      cardData,
      "#card_template",
      (name, link) => {
        imagePopup.open(link, name);
      }
    );

    cardSection.addItem(card.generateCard());
    newCardPopup.close();
  },
  "#new-card-popup"
);

newCardPopup.setEventListeners();

// Botón para editar el perfil
const editButton =
  document.querySelector<HTMLButtonElement>(".profile__edit-button");

if (!editButton) {
  throw new Error("No se encontró el botón para editar el perfil");
}

const nameInput =
  profileFormElement.querySelector<HTMLInputElement>('[name="name"]');

const descriptionInput =
  profileFormElement.querySelector<HTMLInputElement>(
    '[name="description"]'
  );

if (!nameInput || !descriptionInput) {
  throw new Error("No se encontraron los campos del perfil");
}

editButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();

  nameInput.value = currentUser.name;
  descriptionInput.value = currentUser.job;

  profileValidator.resetValidation();
  profilePopup.open();
});

// Botón para agregar una tarjeta
const addCardButton =
  document.querySelector<HTMLButtonElement>(".profile__add-button");

if (!addCardButton) {
  throw new Error("No se encontró el botón para agregar tarjetas");
}

addCardButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});
