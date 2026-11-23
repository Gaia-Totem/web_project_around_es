
import type { UserData } from "./UserInfo.js";
import type { CardData } from "./Card.js";
import type { NewCardData } from "./Card.js";

export class Api {
  private _baseUrl: string;
  private _headers: Record<string,string>; //Esta propiedad contendrá un objeto cuyas *claves* serán strings y cuyos *valores* también serán strings.

  constructor(options: { baseUrl: string, headers: Record<string,string>  }) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


  private async handleResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

async getUserInfo(): Promise<UserData> {
  const res = await fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers,
  });

  return await this.handleResponse<UserData>(res);
}

async getInitialCards(): Promise<CardData[]> {
  const res = await fetch(`${this._baseUrl}/cards/`, {
    headers: this._headers,
  });

  return await this.handleResponse<CardData[]>(res);
}

  async updateUserInfo(data: {
    name: string;
    about: string
  }): Promise<UserData> {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return await this.handleResponse<UserData>(res);
  }

async updateAvatar(avatar: string): Promise<UserData> {
  const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({ avatar }),
  });

  return await this.handleResponse<UserData>(res);
}


async addCard(data: NewCardData): Promise<CardData> {
  const res = await fetch(`${this._baseUrl}/cards/`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify(data),
  });

  return await this.handleResponse<CardData>(res);
}

async deleteCard(cardId: string): Promise<void> {
  const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: this._headers,
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
}

async changeLikeCardStatus(
  cardId: string,
  isLiked: boolean
): Promise<CardData> {
  const method = isLiked ? "PUT" : "DELETE";

  const res = await fetch(
    `${this._baseUrl}/cards/${cardId}/likes`,
    {
      method,
      headers: this._headers,
    }
  );
  return await this.handleResponse<CardData>(res);
}
}