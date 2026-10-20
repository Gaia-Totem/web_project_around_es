import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(handleFormSubmit, selector) {
        super(selector);
        const form = this._popup.querySelector("form");
        if (!form) {
            throw new Error("No se encontró el formulario del popup");
        }
        this._form = form;
        this._handleFormSubmit = handleFormSubmit;
    }
    getInputValues() {
        const inputList = this._form.querySelectorAll("input, textarea");
        const values = {};
        inputList.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleFormSubmit(this.getInputValues());
        });
    }
    close() {
        this._form.reset();
        super.close();
    }
}
//# sourceMappingURL=PopupWithForm.js.map