import { action, makeObservable, observable } from "mobx";
import { merge } from "lodash";

export interface Player {
    showTimestamp: boolean;
}

export class PlayerStoreIMPL {
    showAuthentication: boolean = false;
    haveInterfaceOpen: boolean = false;
    player: Player = {
        showTimestamp: false,
    };

    constructor() {
        makeObservable(this, {
            showAuthentication: observable,
            haveInterfaceOpen: observable,
            player: observable,

            setShowAuthentication: action,
            setHaveInterfaceOpen: action,
            updatePlayer: action,
        });
    }

    setShowAuthentication(bool: boolean) {
        this.showAuthentication = bool;
        this.setHaveInterfaceOpen(bool);
    }

    setHaveInterfaceOpen(bool: boolean) {
        this.haveInterfaceOpen = bool;
    }

    updatePlayer(obj: Player) {
        const newPlayer = merge(this.player, obj);

        this.player = newPlayer;
    }
}

export const PlayerStore = new PlayerStoreIMPL();
