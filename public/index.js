var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const handleLikeClick = (cardId, isLiked) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield api.changeLikeCardStatus(cardId, isLiked);
    }
    catch (err) {
        console.error("Error al cambiar el estado del like:", err);
    }
});
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
const popupWithConfirmation = new PopupWithConfirmation((cardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield api.deleteCard(cardId);
        selectedCard === null || selectedCard === void 0 ? void 0 : selectedCard.deleteCard();
        selectedCard = null;
    }
    catch (err) {
        console.error("Error al eliminar la tarjeta:", err);
        throw err;
    }
}), ".popup_type_confirmation");
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
// - Validación del formulario de nuevas tarjetas.
const newCardFormElement = document.querySelector("#new-card-form");
if (!newCardFormElement) {
    throw new Error("No se encontró el formulario de nuevas tarjetas");
}
const newCardValidator = new FormValidator(defaultFormConfig, newCardFormElement);
newCardValidator.enableValidation();
// Validación del formulario del avatar.
const avatarFormElement = document.querySelector("#avatar-form");
if (!avatarFormElement) {
    throw new Error("No se encontró el formulario del avatar");
}
const avatarValidator = new FormValidator(defaultFormConfig, avatarFormElement);
avatarValidator.enableValidation();
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// -Popup para editar el perfil.
const profilePopup = new PopupWithForm((inputValues) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const submitButton = document.querySelector("#edit-profile-form .popup__button");
    const originalButtonText = submitButton === null || submitButton === void 0 ? void 0 : submitButton.textContent;
    if (submitButton) {
        submitButton.textContent = "Guardando...";
        submitButton.disabled = true;
    }
    try {
        const userData = {
            name: (_a = inputValues.name) !== null && _a !== void 0 ? _a : "",
            about: (_b = inputValues.description) !== null && _b !== void 0 ? _b : "",
        };
        const user = yield api.updateUserInfo(userData);
        userInfo.setUserInfo({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
        });
        yield wait(2000);
        profilePopup.close();
    }
    catch (err) {
        console.error("Error al actualizar el perfil:", err);
    }
    finally {
        if (submitButton) {
            submitButton.textContent = originalButtonText !== null && originalButtonText !== void 0 ? originalButtonText : "Guardar";
            submitButton.disabled = false;
        }
    }
}), "#edit-popup");
profilePopup.setEventListeners();
// -Popup para editar el  avatar o foto de perfil.
const popupWithAvatar = new PopupWithForm((inputValues) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const submitButton = document.querySelector("#avatar-popup .popup__button");
    const originalButtonText = submitButton === null || submitButton === void 0 ? void 0 : submitButton.textContent;
    if (submitButton) {
        submitButton.textContent = "Guardando...";
        submitButton.disabled = true;
    }
    try {
        const avatar = (_a = inputValues.avatar) !== null && _a !== void 0 ? _a : "";
        const user = yield api.updateAvatar(avatar);
        userInfo.setUserInfo({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
        });
        yield wait(2000);
        popupWithAvatar.close();
    }
    catch (err) {
        console.error("Error al actualizar el avatar:", err);
    }
    finally {
        if (submitButton) {
            submitButton.textContent = originalButtonText !== null && originalButtonText !== void 0 ? originalButtonText : "Guardar";
            submitButton.disabled = false;
        }
    }
}), "#avatar-popup");
popupWithAvatar.setEventListeners();
// -Popup para agregar tarjetas.
const newCardPopup = new PopupWithForm((inputValues) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const submitButton = document.querySelector("#new-card-popup .popup__button");
    const originalButtonText = submitButton === null || submitButton === void 0 ? void 0 : submitButton.textContent;
    if (submitButton) {
        submitButton.textContent = "Guardando...";
        submitButton.disabled = true;
    }
    try {
        const cardData = {
            name: (_a = inputValues["place-name"]) !== null && _a !== void 0 ? _a : "",
            link: (_b = inputValues.link) !== null && _b !== void 0 ? _b : "",
        };
        const newCardData = yield api.addCard(cardData);
        const card = new Card(newCardData, "#card_template", (name, link) => {
            imagePopup.open(link, name);
        }, handleLikeClick, handleDeleteClick);
        if (cardSection) {
            cardSection.addItem(card.generateCard());
        }
        yield wait(2000);
        newCardPopup.close();
    }
    catch (err) {
        console.error("Error al agregar la tarjeta:", err);
    }
    finally {
        if (submitButton) {
            submitButton.textContent = originalButtonText !== null && originalButtonText !== void 0 ? originalButtonText : "Guardar";
            submitButton.disabled = false;
        }
    }
}), "#new-card-popup");
newCardPopup.setEventListeners();
// -Obtiene los datos del servidor.
const loadInitialData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [user, cards] = yield Promise.all([
            api.getUserInfo(),
            api.getInitialCards(),
        ]);
        console.log("Tarjetas recibidas del servidor:", cards);
        userInfo.setUserInfo({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
        });
        cardSection = new Section({
            items: cards,
            renderer: (item) => {
                const card = new Card(item, "#card_template", (name, link) => {
                    imagePopup.open(link, name);
                }, handleLikeClick, handleDeleteClick);
                cardSection.addItem(card.generateCard());
            },
        }, ".cards__list");
        cardSection.renderItems();
    }
    catch (err) {
        console.error("Error al cargar los datos:", err);
    }
});
loadInitialData();
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
    avatarValidator.resetValidation();
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
