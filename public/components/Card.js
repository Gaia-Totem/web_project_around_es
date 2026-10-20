/*Crea las tarjetas y configura los botones de «Me gusta», eliminar y abrir imagen. */
export class Card {
    constructor(data, selector, handleCardClick) {
        this._data = data;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
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
        if (!titleElement || !imageElement) {
            throw new Error("Faltan elementos dentro de la tarjeta");
        }
        titleElement.textContent = this._data.name;
        imageElement.src = this._data.link;
        imageElement.alt = this._data.name;
    }
    _setEventListeners() {
        const imageElement = this._element.querySelector(".card__image");
        const likeButton = this._element.querySelector(".card__like-button");
        const deleteButton = this._element.querySelector(".card__delete-button");
        imageElement === null || imageElement === void 0 ? void 0 : imageElement.addEventListener("click", () => {
            this._handleCardClick(this._data.name, this._data.link);
        });
        likeButton === null || likeButton === void 0 ? void 0 : likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button_is-active");
        });
        deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", () => {
            this._element.remove();
        });
    }
    generateCard() {
        return this._element;
    }
}
//# sourceMappingURL=Card.js.map