
import { Card, type CardData, type NewCardData } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Api } from "./components/Api.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";

// -Crea el objeto API
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "b54fad1a-e4e3-4a3d-94b8-6640e2531bef",
    "Content-Type": "application/json",
  },
});
// -Declara la sección de tarjetas
let cardSection: Section<CardData> | null = null; //Guarda la sección donde se muestran las tarjetas

// -Gestiona los Me gusta de las tarjetas.
const handleLikeClick = async (
  cardId: string,
  isLiked: boolean
): Promise<void> => {
  try {
    await api.changeLikeCardStatus(cardId, isLiked);
  } catch (err) {
    console.error("Error al cambiar el estado del like:", err);
  }
};

// -Información del perfil
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// -Popup de imágenes
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// -selectedCard Guarda la tarjeta que queremos eliminar.
let selectedCard: Card | null = null; 

// - Crea la ventana de confirmación 
// define qué sucede después de confirmar o cancelar la eliminación de la tarjeta. 

const popupWithConfirmation = new PopupWithConfirmation(
  async (cardId) => {
    try {
      await api.deleteCard(cardId);
      selectedCard?.deleteCard();
      selectedCard = null;
    } catch (err) {
      console.error("Error al eliminar la tarjeta:", err);
      throw err;
    }
  },
  ".popup_type_confirmation"
);
popupWithConfirmation.setEventListeners();


// -Guarda la tarjeta que queremos eliminar y abre el popup de confirmación.
const handleDeleteClick = (card: Card, cardId: string): void => {
  selectedCard = card; //Guarda aquí el objeto de la tarjeta que el usuario quiere eliminar.
  popupWithConfirmation.openWithCardId(cardId);
};
const profileFormElement =
  document.querySelector<HTMLFormElement>("#edit-profile-form");
if (!profileFormElement) {
  throw new Error("No se encontró el formulario del perfil");
}

// - Validación del formulario de perfil.
const profileValidator = new FormValidator(
  defaultFormConfig,
  profileFormElement
);
profileValidator.enableValidation();

// - Validación del formulario de nuevas tarjetas.
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

// Validación del formulario del avatar.
const avatarFormElement =
  document.querySelector<HTMLFormElement>("#avatar-form");

if (!avatarFormElement) {
  throw new Error("No se encontró el formulario del avatar");
}

const avatarValidator = new FormValidator(
  defaultFormConfig,
  avatarFormElement
);

avatarValidator.enableValidation();

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// -Popup para editar el perfil.

const profilePopup = new PopupWithForm(
  async (inputValues) => {
    const submitButton = document.querySelector<HTMLButtonElement>(
      "#edit-profile-form .popup__button"
    );

    const originalButtonText = submitButton?.textContent;

    if (submitButton) {
      submitButton.textContent = "Guardando...";
      submitButton.disabled = true;
    }

    try {
      const userData = {
        name: inputValues.name ?? "",
        about: inputValues.description ?? "",
      };

      const user = await api.updateUserInfo(userData);

      userInfo.setUserInfo({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });

      await wait(2000);
      profilePopup.close();

    } catch (err) {
      console.error("Error al actualizar el perfil:", err);

    } finally {
      if (submitButton) {
        submitButton.textContent = originalButtonText ?? "Guardar";
        submitButton.disabled = false;
      }
    }
  },
  "#edit-popup"
);

profilePopup.setEventListeners();

// -Popup para editar el  avatar o foto de perfil.

const popupWithAvatar = new PopupWithForm(
  async (inputValues) => {
    const submitButton = document.querySelector<HTMLButtonElement>(
      "#avatar-popup .popup__button"
    );

    const originalButtonText = submitButton?.textContent;

    if (submitButton) {
      submitButton.textContent = "Guardando...";
      submitButton.disabled = true;
    }

    try {
      const avatar = inputValues.avatar ?? "";

      const user = await api.updateAvatar(avatar);

      userInfo.setUserInfo({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });

      await wait(2000);
      popupWithAvatar.close();

    } catch (err) {
      console.error("Error al actualizar el avatar:", err);

    } finally {
      if (submitButton) {
        submitButton.textContent = originalButtonText ?? "Guardar";
        submitButton.disabled = false;
      }
    }
  },
  "#avatar-popup"
);

popupWithAvatar.setEventListeners();

// -Popup para agregar tarjetas.

const newCardPopup = new PopupWithForm(
  async (inputValues) => {
    const submitButton = document.querySelector<HTMLButtonElement>(
      "#new-card-popup .popup__button"
    );

    const originalButtonText = submitButton?.textContent;

    if (submitButton) {
      submitButton.textContent = "Guardando...";
      submitButton.disabled = true;
    }

    try {
      const cardData: NewCardData = {
        name: inputValues["place-name"] ?? "",
        link: inputValues.link ?? "",
      };

      const newCardData = await api.addCard(cardData);

      const card = new Card(
        newCardData,
        "#card_template",
        (name, link) => {
          imagePopup.open(link, name);
        },
        handleLikeClick,
        handleDeleteClick
      );

      if (cardSection) {
        cardSection.addItem(card.generateCard());
      }

      await wait(2000);
      newCardPopup.close();

    } catch (err) {
      console.error("Error al agregar la tarjeta:", err);

    } finally {
      if (submitButton) {
        submitButton.textContent = originalButtonText ?? "Guardar";
        submitButton.disabled = false;
      }
    }
  },
  "#new-card-popup"
);

newCardPopup.setEventListeners();


// -Obtiene los datos del servidor.

const loadInitialData = async (): Promise<void> => {
  try {
    const [user, cards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);

    console.log("Tarjetas recibidas del servidor:", cards);

    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });

    cardSection = new Section<CardData>(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(
            item,
            "#card_template",
            (name, link) => {
              imagePopup.open(link, name);
            },
            handleLikeClick,
            handleDeleteClick
          );

          cardSection!.addItem(card.generateCard());
        },
      },
      ".cards__list"
    );

    cardSection.renderItems();

  } catch (err) {
    console.error("Error al cargar los datos:", err);
  }
};
loadInitialData();


// -Botón para editar el perfil.
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
  descriptionInput.value = currentUser.about;

  profileValidator.resetValidation();
  profilePopup.open();
});

// -Botón para editar el avatar o foto de perfil. 
const avatarEditButton = document.querySelector(
  ".profile__image-edit"
);

avatarEditButton?.addEventListener("click", () => {
   avatarValidator.resetValidation();
  popupWithAvatar.open();
});

// -Botón para agregar tarjetas.
const addCardButton =
  document.querySelector<HTMLButtonElement>(".profile__add-button");

if (!addCardButton) {
  throw new Error("No se encontró el botón para agregar tarjetas");
}

addCardButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});
