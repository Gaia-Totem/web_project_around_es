import { Popup } from "./Popup.js";

/* Datos, envío y reinicio del formulario */
export type FormSubmitCallback = (
  inputValues: Record<string, string>
) => void;

export class PopupWithForm extends Popup {
  private _form: HTMLFormElement;
  private _handleFormSubmit: FormSubmitCallback;

  constructor(
    handleFormSubmit: FormSubmitCallback,
    selector: string
  ) {
    super(selector);

    const form = this._popup.querySelector<HTMLFormElement>("form");

    if (!form) {
      throw new Error("No se encontró el formulario del popup");
    }

    this._form = form;
    this._handleFormSubmit = handleFormSubmit;
  }

  private getInputValues(): Record<string, string> {
    const inputList =
      this._form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        "input, textarea"
      );

    const values: Record<string, string> = {};

    inputList.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this._form.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();

      this._handleFormSubmit(this.getInputValues());
    });
  }

  public close(): void {
    this._form.reset();
    super.close();
  }
}