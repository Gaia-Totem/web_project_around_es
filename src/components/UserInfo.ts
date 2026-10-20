/* La clase UserInfo es responsable de presentar información sobre el usuario: obtiene y actualiza el nombre y la descripción. */
export interface UserData {
  name: string;
  job: string;
}

export class UserInfo {
  private _nameElement: HTMLElement;
  private _jobElement: HTMLElement;

  constructor(selectors: {
    nameSelector: string;
    jobSelector: string;
  }) {
    const nameElement = document.querySelector<HTMLElement>(
      selectors.nameSelector
    );

    const jobElement = document.querySelector<HTMLElement>(
      selectors.jobSelector
    );

    if (!nameElement || !jobElement) {
      throw new Error("No se encontraron los elementos del perfil");
    }

    this._nameElement = nameElement;
    this._jobElement = jobElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this._nameElement.textContent ?? "",
      job: this._jobElement.textContent ?? "",
    };
  }

  public setUserInfo(data: UserData): void {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.job;
  }
}
