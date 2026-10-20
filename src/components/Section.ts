
interface SectionOptions<T> {
  items: T[];
  renderer: (item: T) => void;
}

/* inserta las tarjetas en la lista. */
export class Section<T> {
  private _items: T[];
  private _renderer: (item: T) => void;
  private _container: HTMLElement;

  constructor(
    { items, renderer }: SectionOptions<T>,
    selector: string
  ) {
    this._items = items;
    this._renderer = renderer;

    const container = document.querySelector<HTMLElement>(selector);

    if (!container) {
      throw new Error(`No se encontró el contenedor: ${selector}`);
    }

    this._container = container;
  }

  public renderItems(): void {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  public addItem(element: HTMLElement): void {
    this._container.append(element);
  }
}
/* código usando any en vez de genéricos...

interface SectionOptions {
  items: any[];
  renderer: (item: any) => void;
}

export class Section {
  private _items: any[];
  private _renderer: (item: any) => void;
  private _container: HTMLElement;

  constructor(
    { items, renderer }: SectionOptions,
    selector: string
  ) {
    this._items = items;
    this._renderer = renderer;

    const container = document.querySelector<HTMLElement>(selector);

    if (!container) {
      throw new Error(`No se encontró el contenedor: ${selector}`);
    }

    this._container = container;
  }

  public renderItems(): void {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  public addItem(element: HTMLElement): void {
    this._container.append(element);
  }
}
*/

