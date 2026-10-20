/* valida los campos y habilita o deshabilita los botones. */
export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        if (!buttonElement) {
            throw new Error("No se encontró el botón Submit del formulario");
        }
        this._buttonElement = buttonElement;
    }
    _checkInputValidity(input) {
        const errorElement = input.nextElementSibling;
        if (!input.validity.valid) {
            input.classList.add(this._config.inputErrorClass);
            if (errorElement) {
                errorElement.textContent = input.validationMessage;
                errorElement.classList.add(this._config.errorClass);
            }
        }
        else {
            input.classList.remove(this._config.inputErrorClass);
            if (errorElement) {
                errorElement.textContent = "";
                errorElement.classList.remove(this._config.errorClass);
            }
        }
    }
    _toggleButtonState() {
        const isFormValid = this._inputList.every((input) => input.validity.valid);
        this._buttonElement.disabled = !isFormValid;
        if (isFormValid) {
            this._buttonElement.classList.remove(this._config.disabledButtonClass);
        }
        else {
            this._buttonElement.classList.add(this._config.disabledButtonClass);
        }
    }
    _setEventListeners() {
        this._inputList.forEach((input) => {
            input.addEventListener("input", (event) => {
                const target = event.target;
                if (target instanceof HTMLInputElement) {
                    this._checkInputValidity(target);
                    this._toggleButtonState();
                }
            });
        });
    }
    enableValidation() {
        this._setEventListeners();
        this._toggleButtonState();
    }
    resetValidation() {
        this._inputList.forEach((input) => {
            input.classList.remove(this._config.inputErrorClass);
            const errorElement = input.nextElementSibling;
            if (errorElement) {
                errorElement.textContent = "";
                errorElement.classList.remove(this._config.errorClass);
            }
        });
        this._toggleButtonState();
    }
}
//# sourceMappingURL=FormValidator.js.map