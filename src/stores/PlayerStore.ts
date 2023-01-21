import { action, makeObservable, observable } from "mobx";

export class PlayerStoreIMPL {
    showAuthentication: boolean = true;

    constructor() {
        makeObservable(this, {
            showAuthentication: observable,
            setShowAuthentication: action,
        });
    }

    setShowAuthentication(bool: boolean) {
        this.showAuthentication = bool;
    }
}

export const PlayerStore = new PlayerStoreIMPL();
