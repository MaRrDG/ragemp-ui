import { action, makeObservable, observable } from "mobx";
import { merge } from "lodash";
import { DeepPartial } from "../@types";

export interface Player {
    showTimestamp: boolean;
    isLogged: boolean;
    showHud: boolean;
    showChat: boolean;
    money: number;
    bankMoney: number;
    id: number;
}

export interface Paycheck {
    showPayCheck: boolean;
    money: number;
    experience: number;
    minutes: number;
    seconds: number;
}

export class PlayerStoreIMPL {
    showAuthentication: boolean = false;
    haveInterfaceOpen: boolean = false;
    showDisclaimer: boolean = false;
    version = {
        serverVersion: "0.0.1",
        uiVersion: "0.0.1",
    };
    payCheck: Paycheck = {
        showPayCheck: false,
        money: 0,
        experience: 0,
        minutes: 60,
        seconds: 60,
    };
    player: Player = {
        showTimestamp: false,
        showHud: true,
        showChat: true,
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
            payCheck: observable,

            setShowAuthentication: action,
            updatePlayer: action,
            setHaveInterfaceOpen: action,
            setShowDisclaimer: action,
            setPayCheck: action,
        });
    }

    setShowDisclaimer(bool: boolean) {
        this.showDisclaimer = bool;
    }

    setPayCheck(data: DeepPartial<Paycheck>) {
        this.payCheck = merge(this.payCheck, data);
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

    updatePlayer(data: DeepPartial<Player>) {
        const newPlayer = merge(this.player, data);

        this.player = newPlayer;
    }
}

export const PlayerStore = new PlayerStoreIMPL();
