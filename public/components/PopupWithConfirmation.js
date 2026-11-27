import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(handleConfirm, selector) {
        super(selector);
        this._cardId = "";
        this._handleConfirm = handleConfirm;
    }
    //-Guarda el ID de la tarjeta que queremos eliminar y después abre el popup.
    openWithCardId(cardId) {
        this._cardId = cardId;
        super.open();
    }
    setEventListeners() {
        //Configuramos los eventos heredados de Popup.
        super.setEventListeners();
        // Buscamos el formulario de confirmación.
        const confirmForm = this._popup.querySelector(".popup__form");
        // Comprobamos que exista.
        if (!confirmForm) {
            throw new Error("No se encontró el formulario de confirmación");
        }
        // Escuchamos cuando se envía el formulario.
        confirmForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleConfirm(this._cardId)
                .then(() => {
                this.close();
                this._cardId = "";
            })
                .catch((err) => {
                console.error("Error al eliminar la tarjeta:", err);
            });
        });
    }
}
