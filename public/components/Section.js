/* inserta las tarjetas en la lista. */
export class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        const container = document.querySelector(selector);
        if (!container) {
            throw new Error(`No se encontró el contenedor: ${selector}`);
        }
        this._container = container;
    }
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(element) {
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
//# sourceMappingURL=Section.js.map