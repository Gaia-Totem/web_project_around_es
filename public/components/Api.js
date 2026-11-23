export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    async handleResponse(res) {
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async getUserInfo() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        });
        return await this.handleResponse(res);
    }
    async getInitialCards() {
        const res = await fetch(`${this._baseUrl}/cards/`, {
            headers: this._headers,
        });
        return await this.handleResponse(res);
    }
    async updateUserInfo(data) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data),
        });
        return await this.handleResponse(res);
    }
    async updateAvatar(avatar) {
        const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar }),
        });
        return await this.handleResponse(res);
    }
    async addCard(data) {
        const res = await fetch(`${this._baseUrl}/cards/`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),
        });
        return await this.handleResponse(res);
    }
    async deleteCard(cardId) {
        const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
    }
    async changeLikeCardStatus(cardId, isLiked) {
        const method = isLiked ? "PUT" : "DELETE";
        const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method,
            headers: this._headers,
        });
        return await this.handleResponse(res);
    }
}
//# sourceMappingURL=Api.js.map