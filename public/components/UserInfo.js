export class UserInfo {
    constructor(selectors) {
        const nameElement = document.querySelector(selectors.nameSelector);
        const jobElement = document.querySelector(selectors.jobSelector);
        if (!nameElement || !jobElement) {
            throw new Error("No se encontraron los elementos del perfil");
        }
        this._nameElement = nameElement;
        this._jobElement = jobElement;
    }
    getUserInfo() {
        var _a, _b;
        return {
            name: (_a = this._nameElement.textContent) !== null && _a !== void 0 ? _a : "",
            job: (_b = this._jobElement.textContent) !== null && _b !== void 0 ? _b : "",
        };
    }
    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._jobElement.textContent = data.job;
    }
}
//# sourceMappingURL=UserInfo.js.map