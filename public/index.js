import { Card } from "./components/Card.js";
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
let cardSection = null; //Guarda la sección donde se muestran las tarjetas
// -Gestiona los Me gusta de las tarjetas.
const handleLikeClick = (cardId, isLiked) => {
    return api.changeLikeCardStatus(cardId, isLiked).then(() => { });
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
let selectedCard = null;
// - Crea la ventana de confirmación 
// define qué sucede después de confirmar o cancelar la eliminación de la tarjeta. 
const popupWithConfirmation = new PopupWithConfirmation((cardId) => {
    return api.deleteCard(cardId) //cuando confirmamos, solicita eliminarla del servidor.
        .then(() => {
        selectedCard === null || selectedCard === void 0 ? void 0 : selectedCard.deleteCard();
        selectedCard = null; //el null Limpia la referencia a la tarjeta que acabamos de eliminar.
    })
        .catch((err) => {
        console.error("Error al eliminar la tarjeta:", err);
    });
}, ".popup_type_confirmation");
popupWithConfirmation.setEventListeners();
// -Guarda la tarjeta que queremos eliminar y abre el popup de confirmación.
const handleDeleteClick = (card, cardId) => {
    selectedCard = card; //Guarda aquí el objeto de la tarjeta que el usuario quiere eliminar.
    popupWithConfirmation.openWithCardId(cardId);
};
const profileFormElement = document.querySelector("#edit-profile-form");
if (!profileFormElement) {
    throw new Error("No se encontró el formulario del perfil");
}
// - Validación del formulario de perfil.
const profileValidator = new FormValidator(defaultFormConfig, profileFormElement);
profileValidator.enableValidation();
// 6. Validación del formulario de nuevas tarjetas.
const newCardFormElement = document.querySelector("#new-card-form");
if (!newCardFormElement) {
    throw new Error("No se encontró el formulario de nuevas tarjetas");
}
const newCardValidator = new FormValidator(defaultFormConfig, newCardFormElement);
newCardValidator.enableValidation();
// -Popup para editar el perfil.
const profilePopup = new PopupWithForm((inputValues) => {
    var _a, _b;
    const userData = {
        name: (_a = inputValues.name) !== null && _a !== void 0 ? _a : "",
        about: (_b = inputValues.description) !== null && _b !== void 0 ? _b : "",
    };
    api.updateUserInfo(userData)
        .then((user) => {
        userInfo.setUserInfo({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
        });
        profilePopup.close();
    })
        .catch((err) => {
        console.error("Error al actualizar el perfil:", err);
    });
}, "#edit-popup");
profilePopup.setEventListeners();
// -Popup para editar el  avatar o foto de perfil.
const popupWithAvatar = new PopupWithForm((inputValues) => {
    var _a;
    const avatar = (_a = inputValues.avatar) !== null && _a !== void 0 ? _a : "";
    api.updateAvatar(avatar)
        .then((user) => {
        userInfo.setUserInfo({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
        });
        popupWithAvatar.close();
    })
        .catch((err) => {
        console.error("Error al actualizar el avatar:", err);
    });
}, "#avatar-popup");
popupWithAvatar.setEventListeners();
// -Popup para agregar tarjetas.
const newCardPopup = new PopupWithForm((inputValues) => {
    var _a, _b;
    // -Crea los datos que enviaremos al servidor
    const cardData = {
        name: (_a = inputValues["place-name"]) !== null && _a !== void 0 ? _a : "",
        link: (_b = inputValues.link) !== null && _b !== void 0 ? _b : "",
    };
    api.addCard(cardData)
        .then((newCardData) => {
        // -Crea la tarjeta con los datos recibidos.
        const card = new Card(newCardData, "#card_template", (name, link) => {
            imagePopup.open(link, name);
        }, handleLikeClick, handleDeleteClick);
        // -Agrega la tarjeta a la sección.
        if (cardSection) {
            cardSection.addItem(card.generateCard());
            newCardPopup.close();
        }
    })
        .catch((err) => {
        console.error("Error al agregar la tarjeta:", err);
    });
}, "#new-card-popup");
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
    cardSection = new Section({
        items: cards,
        renderer: (item) => {
            const card = new Card(item, "#card_template", (name, link) => {
                imagePopup.open(link, name);
            }, handleLikeClick, handleDeleteClick);
            cardSection.addItem(card.generateCard());
        },
    }, ".cards__list");
    // -Muestra todas las tarjetas.
    cardSection.renderItems();
})
    .catch((err) => {
    console.error("Error al cargar los datos:", err);
});
// -Botón para editar el perfil.
const editButton = document.querySelector(".profile__edit-button");
if (!editButton) {
    throw new Error("No se encontró el botón para editar el perfil");
}
const nameInput = profileFormElement.querySelector('[name="name"]');
const descriptionInput = profileFormElement.querySelector('[name="description"]');
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
const avatarEditButton = document.querySelector(".profile__image-edit");
avatarEditButton === null || avatarEditButton === void 0 ? void 0 : avatarEditButton.addEventListener("click", () => {
    popupWithAvatar.open();
});
// -Botón para agregar tarjetas.
const addCardButton = document.querySelector(".profile__add-button");
if (!addCardButton) {
    throw new Error("No se encontró el botón para agregar tarjetas");
}
addCardButton.addEventListener("click", () => {
    newCardValidator.resetValidation();
    newCardPopup.open();
});
//# sourceMappingURL=index.js.map