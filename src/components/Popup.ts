/* Abrir, cerrar y eventos comunes */
export class Popup {
  protected _popup: HTMLElement; //guarda la ventana modal y permite que las clases hijas accedan a ella, ya sea la iamgen la layenda o el formulario.

  constructor(selector: string) {
    const popupElement = document.querySelector<HTMLElement>(selector);

    if (!popupElement) {
      throw new Error(`No se encontró el popup: ${selector}`);
    }

    this._popup = popupElement;
  }
/*open():añade la clase CSS que muestra la ventana. */
  public open(): void {
    this._popup.classList.add("popup_is-opened");
  }

/*close(): elimina esa clase y la oculta.*/
  public close(): void {
    this._popup.classList.remove("popup_is-opened");
  }

  /*handleEscClose(): comprueba si se pulsó Escape. Está escrita como una función flecha para conservar el valor de this. */
  private handleEscClose = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  /*setEventListeners(): conecta los eventos de cierre.*/
  public setEventListeners(): void {
    const closeButton =
      this._popup.querySelector<HTMLButtonElement>(".popup__close");

    closeButton?.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (event: MouseEvent) => {
      if (event.target === this._popup) {
        this.close();
      }
    });

    document.addEventListener("keydown", this.handleEscClose);
  }
}
