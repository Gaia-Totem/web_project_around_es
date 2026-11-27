var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers,
            });
            return this.handleResponse(res);
        });
    }
    getInitialCards() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._baseUrl}/cards/`, {
                headers: this._headers,
            });
            return this.handleResponse(res);
        });
    }
    updateUserInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._baseUrl}/users/me`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify(data),
            });
            return this.handleResponse(res);
        });
    }
    updateAvatar(avatar) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._baseUrl}/users/me/avatar`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({ avatar }),
            });
            return this.handleResponse(res);
        });
    }
    addCard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._baseUrl}/cards/`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify(data),
            });
            return this.handleResponse(res);
        });
    }
    deleteCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: "DELETE",
                headers: this._headers,
            });
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }
        });
    }
    changeLikeCardStatus(cardId, isLiked) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = isLiked ? "PUT" : "DELETE";
            const res = yield fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method,
                headers: this._headers,
            });
            return this.handleResponse(res);
        });
    }
}
