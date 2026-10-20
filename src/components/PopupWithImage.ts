import { Popup } from "./Popup.js";

/* muestra la Imagen en grande y su leyenda */
export class PopupWithImage extends Popup {
  private _image: HTMLImageElement;
  private _caption: HTMLElement;

  constructor(selector: string) {
    super(selector);

    const image = this._popup.querySelector<HTMLImageElement>(
      ".popup__image"
    );

    const caption = this._popup.querySelector<HTMLElement>(
      ".popup__caption"
    );

    if (!image || !caption) {
      throw new Error("No se encontró la imagen o la leyenda del popup");
    }

    this._image = image;
    this._caption = caption;
  }

public open(
  imageUrl?: string,
  captionText?: string
): void {
  if (imageUrl !== undefined && captionText !== undefined) {
    this._image.src = imageUrl;
    this._image.alt = captionText;
    this._caption.textContent = captionText;
  }

  super.open();
}
}
