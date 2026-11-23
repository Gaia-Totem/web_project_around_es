
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
const handleLikeClick = (
  cardId: string,
  isLiked: boolean
): Promise<void> => {
  return api.changeLikeCardStatus(cardId, isLiked).then(() => {});
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
  (cardId) => {
    return api.deleteCard(cardId) //cuando confirmamos, solicita eliminarla del servidor.
      .then(() => { //si tiene éxito, también la elimina de la página.
         selectedCard?.deleteCard();
        selectedCard = null; //el null Limpia la referencia a la tarjeta que acabamos de eliminar.
      })
      .catch((err) => {
        console.error("Error al eliminar la tarjeta:", err);
      });
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

// 6. Validación del formulario de nuevas tarjetas.
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

// -Popup para editar el perfil.
const profilePopup = new PopupWithForm(
  (inputValues) => {
    const submitButton = document.querySelector<HTMLButtonElement>(
      "#edit-profile-form .popup__button"
    );
    const originalButtonText = submitButton?.textContent;
    if (submitButton) {
      submitButton.textContent = "Guardando...";
      submitButton.disabled = true;
    }
    const userData = {
      name: inputValues.name ?? "",
      about: inputValues.description ?? "",
    };
    // Función para restaurar el botón
    const restoreButton = () => {
      if (submitButton) {
        submitButton.textContent = originalButtonText ?? "Guardar";
        submitButton.disabled = false;
      }
    };

    api
      .updateUserInfo(userData)
      .then((user) => {
        userInfo.setUserInfo({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
        setTimeout(() => {
          profilePopup.close();
          restoreButton();
        }, 800);
      })
      .catch((err) => {
        console.error("Error al actualizar el perfil:", err);
        restoreButton();
      });
  },
  "#edit-popup"
);
profilePopup.setEventListeners();


// -Popup para editar el  avatar o foto de perfil.
const popupWithAvatar = new PopupWithForm(
  (inputValues) => {
    const submitButton = document.querySelector<HTMLButtonElement>(
      "#avatar-popup .popup__button"
    );
    const originalButtonText = submitButton?.textContent;
    // Activa el estado de carga.
    if (submitButton) {
      submitButton.textContent = "Guardando...";
      submitButton.disabled = true;
    }
    const avatar = inputValues.avatar ?? "";
    // Función para restaurar el botón.
    const restoreButton = () => {
      if (submitButton) {
        submitButton.textContent = originalButtonText ?? "Guardar";
        submitButton.disabled = false;
      }
    };
    api.updateAvatar(avatar)
      .then((user) => {
        userInfo.setUserInfo({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });

        setTimeout(() => {
          popupWithAvatar.close();
          restoreButton();
        }, 1000);
      })
      .catch((err) => {
        console.error("Error al actualizar el avatar:", err);
        restoreButton();
      });
  },
  "#avatar-popup"
);
popupWithAvatar.setEventListeners();



// -Popup para agregar tarjetas.
const newCardPopup = new PopupWithForm(
  (inputValues) => {
    const submitButton = document.querySelector<HTMLButtonElement>(
      "#new-card-popup .popup__button"
    );
    const originalButtonText = submitButton?.textContent;
    // Activa el estado de carga.
    if (submitButton) {
      submitButton.textContent = "Guardando...";
      submitButton.disabled = true;
    }
    // Crea los datos que enviaremos al servidor.
    const cardData: NewCardData = {
      name: inputValues["place-name"] ?? "",
      link: inputValues.link ?? "",
    };
    // Función para restaurar el botón.
    const restoreButton = () => {
      if (submitButton) {
        submitButton.textContent = originalButtonText ?? "Guardar";
        submitButton.disabled = false;
      }
    };

    api.addCard(cardData)
      .then((newCardData) => {
        // Crea la tarjeta con los datos recibidos.
        const card = new Card(
          newCardData,
          "#card_template",
          (name, link) => {
            imagePopup.open(link, name);
          },
          handleLikeClick,
          handleDeleteClick,
        );
        // Agrega la tarjeta a la sección.
        if (cardSection) {
          cardSection.addItem(card.generateCard());
        }

        setTimeout(() => {
          newCardPopup.close();
          restoreButton();
        }, 700);
      })
      .catch((err) => {
        console.error("Error al agregar la tarjeta:", err);
        restoreButton();
      });
  },
  "#new-card-popup"
);
newCardPopup.setEventListeners();

// -Obtiene los datos del servidor.
Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(([user, cards]) => {
  console.log("Tarjetas recibidas del servidor:", cards);
    // -Muestra información del usuario.
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });

    // Crea la sección de tarjetas.
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
            handleDeleteClick,
          );

          cardSection!.addItem(card.generateCard());
        },
      },
      ".cards__list"
    );

    // -Muestra todas las tarjetas.
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error("Error al cargar los datos:", err);
  });

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
