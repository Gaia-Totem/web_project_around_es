/* La clase UserInfo es responsable de presentar información sobre el usuario: obtiene y actualiza el nombre y la descripción. */
export interface UserData {
  name: string;
  about: string;
  avatar: string;
}

export class UserInfo {
  private _nameElement: HTMLElement;
  private _aboutElement: HTMLElement;
  private _avatarElement: HTMLImageElement;

  constructor(selectors: {
    nameSelector: string;
    aboutSelector: string;
    avatarSelector: string;
  }) {
    const nameElement = document.querySelector<HTMLElement>(
      selectors.nameSelector
    );
    
    const aboutElement = document.querySelector<HTMLElement>(
      selectors.aboutSelector
    );

    const avatarElement = document.querySelector<HTMLImageElement>(
  selectors.avatarSelector
);

if (!nameElement || !aboutElement || !avatarElement) {
  throw new Error("No se encontraron los elementos del perfil");
}

    this._nameElement = nameElement;
    this._aboutElement = aboutElement;
    this._avatarElement = avatarElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this._nameElement.textContent ?? "",
      about: this._aboutElement.textContent ?? "",
      avatar: this._avatarElement.src,
    };
  }

  public setUserInfo(data: UserData): void {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
    this._avatarElement.src = data.avatar;
  }
}
