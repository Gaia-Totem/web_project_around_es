var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Crea las tarjetas.
export class Card {
    constructor(data, selector, handleCardClick, handleLikeClick, handleDeleteClick) {
        this._data = data;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
        const template = document.querySelector(this._selector);
        if (!template) {
            throw new Error(`No se encontró la plantilla: ${this._selector}`);
        }
        const cardElement = template.content.querySelector(".card");
        if (!cardElement) {
            throw new Error("No se encontró la tarjeta dentro de la plantilla");
        }
        this._element = cardElement.cloneNode(true);
        this._setCardData();
        this._setEventListeners();
    }
    _setCardData() {
        const titleElement = this._element.querySelector(".card__title");
        const imageElement = this._element.querySelector(".card__image");
        const likeButton = this._element.querySelector(".card__like-button");
        if (!titleElement || !imageElement) {
            throw new Error("Faltan elementos dentro de la tarjeta");
        }
        titleElement.textContent = this._data.name;
        imageElement.src = this._data.link;
        imageElement.alt = this._data.name;
        likeButton === null || likeButton === void 0 ? void 0 : likeButton.classList.toggle("card__like-button_is-active", this._data.isLiked);
    }
    _setEventListeners() {
        const imageElement = this._element.querySelector(".card__image");
        const likeButton = this._element.querySelector(".card__like-button");
        const deleteButton = this._element.querySelector(".card__delete-button");
        imageElement === null || imageElement === void 0 ? void 0 : imageElement.addEventListener("click", () => {
            this._handleCardClick(this._data.name, this._data.link);
        });
        likeButton === null || likeButton === void 0 ? void 0 : likeButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const newIsLiked = !this._data.isLiked;
            likeButton.disabled = true;
            try {
                yield this._handleLikeClick(this._data._id, newIsLiked);
                this._data.isLiked = newIsLiked;
                likeButton.classList.toggle("card__like-button_is-active", newIsLiked);
            }
            catch (err) {
                console.error("Error al cambiar el like:", err);
            }
            finally {
                likeButton.disabled = false;
            }
        }));
        deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", () => {
            this._handleDeleteClick(this, this._data._id);
        });
    }
    generateCard() {
        return this._element;
    }
    deleteCard() {
        this._element.remove();
    }
}
