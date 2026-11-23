
export interface CardData {
  name: string;
  link: string;
  _id: string;
  isLiked: boolean;
}
//Crea las tarjetas.
export class Card {
  private _data: CardData;
  private _selector: string;
  private _handleCardClick: (name: string, link: string) => void; //configura el botón de «abrir imagen»
  private _element: HTMLLIElement;
  private _handleLikeClick: (cardId: string, isLiked: boolean) => Promise<void>; //configura el botón de «Me gusta»
  private _handleDeleteClick: (card: Card, cardId: string) => void; //configura el botón de «eliminar»
  private _element: HTMLLIElement;

  constructor(
    data: CardData,
    selector: string,
    handleCardClick: (name: string, link: string) => void,
    handleLikeClick: (cardId: string, isLiked: boolean) => Promise<void>,
    handleDeleteClick: (card: Card, cardId: string) => void,
  ) {
    this._data = data;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;

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
/*_setCardData() tiene la responsabilidad de configurar los datos iniciales de la tarjeta.
Ahora hace tres cosas: */
private _setCardData(): void {
  const titleElement = //1. Coloca el nombre de la tarjeta.
    this._element.querySelector<HTMLElement>(".card__title");

  const imageElement = //2. Coloca la imagen y su texto alternativo.
    this._element.querySelector<HTMLImageElement>(".card__image");

  const likeButton = //3. Configura el corazón según el valor inicial de isLiked.
    this._element.querySelector<HTMLButtonElement>(
      ".card__like-button"
    );

  if (!titleElement || !imageElement) {
    throw new Error("Faltan elementos dentro de la tarjeta");
  }

  titleElement.textContent = this._data.name;
  imageElement.src = this._data.link;
  imageElement.alt = this._data.name;

  likeButton?.classList.toggle(
    "card__like-button_is-active",
    this._data.isLiked
  );
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
  const newIsLiked = !this._data.isLiked;

  this._handleLikeClick(this._data._id, newIsLiked)
    .then(() => {
      this._data.isLiked = newIsLiked;

      likeButton.classList.toggle(
        "card__like-button_is-active",
        newIsLiked
      );
    })
    .catch((err) => {
      console.error("Error al cambiar el like:", err);
    });
});

deleteButton?.addEventListener("click", () => {
  this._handleDeleteClick(this, this._data._id);
});
  }

  public generateCard(): HTMLLIElement {
    return this._element;
  }

  public deleteCard(): void {
  this._element.remove();
}

}
export type NewCardData = Pick<CardData, "name" | "link">;