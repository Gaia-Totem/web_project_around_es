var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        const _super = Object.create(null, {
            setEventListeners: { get: () => super.setEventListeners }
        });
        super.setEventListeners();
        this._form.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            try {
                yield this._handleFormSubmit(this.getInputValues());
            }
            catch (err) {
                console.error("Error al procesar el formulario:", err);
            }
        }));
    }
    close() {
        this._form.reset();
        super.close();
    }
}
