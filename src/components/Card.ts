
export interface CardData {
  name: string;
  link: string;
}
/*Crea las tarjetas y configura los botones de «Me gusta», eliminar y abrir imagen. */
export class Card {
  private _data: CardData;
  private _selector: string;
  private _handleCardClick: (name: string, link: string) => void;
  private _element: HTMLLIElement;

  constructor(
    data: CardData,
    selector: string,
    handleCardClick: (name: string, link: string) => void
  ) {
    this._data = data;
    this._selector = selector;
    this._handleCardClick = handleCardClick;

    const template = document.querySelector<HTMLTemplateElement>(
      this._selector
    );

    if (!template) {
      throw new Error(`No se encontró la plantilla: ${this._selector}`);
    }

    const cardElement = template.content.querySelector<HTMLLIElement>(".card");

    if (!cardElement) {
      throw new Error("No se encontró la tarjeta dentro de la plantilla");
    }

    this._element = cardElement.cloneNode(true) as HTMLLIElement;

    this._setCardData();
    this._setEventListeners();
  }

  private _setCardData(): void {
    const titleElement =
      this._element.querySelector<HTMLElement>(".card__title");

    const imageElement =
      this._element.querySelector<HTMLImageElement>(".card__image");

    if (!titleElement || !imageElement) {
      throw new Error("Faltan elementos dentro de la tarjeta");
    }

    titleElement.textContent = this._data.name;
    imageElement.src = this._data.link;
    imageElement.alt = this._data.name;
  }

  private _setEventListeners(): void {
    const imageElement =
      this._element.querySelector<HTMLImageElement>(".card__image");

    const likeButton =
      this._element.querySelector<HTMLButtonElement>(
        ".card__like-button"
      );

    const deleteButton =
      this._element.querySelector<HTMLButtonElement>(
        ".card__delete-button"
      );

    imageElement?.addEventListener("click", () => {
      this._handleCardClick(this._data.name, this._data.link);
    });

    likeButton?.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_is-active");
    });

    deleteButton?.addEventListener("click", () => {
      this._element.remove();
    });
  }

  public generateCard(): HTMLLIElement {
    return this._element;
  }
}
