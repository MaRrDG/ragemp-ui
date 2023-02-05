import { action, makeObservable, observable } from "mobx";
import { merge } from "lodash";
import { DeepPartial } from "../@types";

export interface Player {
    showTimestamp: boolean;
    isLogged: boolean;
    money: number;
    bankMoney: number;
    id: number;
}

export class PlayerStoreIMPL {
    showAuthentication: boolean = false;
    haveInterfaceOpen: boolean = false;
    showDisclaimer: boolean = false;
    totalPlayers: number = 0;
    version = {
        serverVersion: "0.0.1",
        uiVersion: "0.0.1",
    };
    player: Player = {
        showTimestamp: false,
        isLogged: false,
        money: 0,
        bankMoney: 0,
        id: 0,
    };

    constructor() {
        makeObservable(this, {
            showAuthentication: observable,
            haveInterfaceOpen: observable,
            player: observable,
            showDisclaimer: observable,
            version: observable,
            totalPlayers: observable,

            setTotalPlayers: action,
            setShowAuthentication: action,
            setHaveInterfaceOpen: action,
            updatePlayer: action,
            setShowDisclaimer: action,
        });
    }

    setShowDisclaimer(bool: boolean) {
        this.showDisclaimer = bool;
    }

    setShowAuthentication(bool: boolean) {
        this.showAuthentication = bool;
        this.setHaveInterfaceOpen(bool);
    }

    setHaveInterfaceOpen(bool: boolean) {
        this.haveInterfaceOpen = bool;
    }

    setVersion(version: { serverVersion: string; uiVersion: string }) {
        this.version = version;
    }

    setTotalPlayers(players: number) {
        this.totalPlayers = players;
    }

    updatePlayer(obj: DeepPartial<Player>) {
        const newPlayer = merge(this.player, obj);

        this.player = newPlayer;
    }
}

export const PlayerStore = new PlayerStoreIMPL();
