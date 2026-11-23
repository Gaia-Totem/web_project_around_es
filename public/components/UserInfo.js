export class UserInfo {
    constructor(selectors) {
        const nameElement = document.querySelector(selectors.nameSelector);
        const aboutElement = document.querySelector(selectors.aboutSelector);
        const avatarElement = document.querySelector(selectors.avatarSelector);
        if (!nameElement || !aboutElement || !avatarElement) {
            throw new Error("No se encontraron los elementos del perfil");
        }
        this._nameElement = nameElement;
        this._aboutElement = aboutElement;
        this._avatarElement = avatarElement;
    }
    getUserInfo() {
        var _a, _b;
        return {
            name: (_a = this._nameElement.textContent) !== null && _a !== void 0 ? _a : "",
            about: (_b = this._aboutElement.textContent) !== null && _b !== void 0 ? _b : "",
            avatar: this._avatarElement.src,
        };
    }
    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._aboutElement.textContent = data.about;
        this._avatarElement.src = data.avatar;
    }
}
//# sourceMappingURL=UserInfo.js.map