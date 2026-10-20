/* Abrir, cerrar y eventos comunes */
export class Popup {
    constructor(selector) {
        /*handleEscClose(): comprueba si se pulsó Escape. Está escrita como una función flecha para conservar el valor de this. */
        this.handleEscClose = (event) => {
            if (event.key === "Escape") {
                this.close();
            }
        };
        const popupElement = document.querySelector(selector);
        if (!popupElement) {
            throw new Error(`No se encontró el popup: ${selector}`);
        }
        this._popup = popupElement;
    }
    /*open():añade la clase CSS que muestra la ventana. */
    open() {
        this._popup.classList.add("popup_is-opened");
    }
    /*close(): elimina esa clase y la oculta.*/
    close() {
        this._popup.classList.remove("popup_is-opened");
    }
    /*setEventListeners(): conecta los eventos de cierre.*/
    setEventListeners() {
        const closeButton = this._popup.querySelector(".popup__close");
        closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener("click", () => {
            this.close();
        });
        this._popup.addEventListener("click", (event) => {
            if (event.target === this._popup) {
                this.close();
            }
        });
        document.addEventListener("keydown", this.handleEscClose);
    }
}
//# sourceMappingURL=Popup.js.map