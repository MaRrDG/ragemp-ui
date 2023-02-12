import { action, makeObservable, observable } from "mobx";
import { merge } from "lodash";
import { DeepPartial, IPlayer } from "../@types";

export class PlayerStoreIMPL {
    showAuthentication: boolean = false;
    haveInterfaceOpen: boolean = false;
    showDisclaimer: boolean = false;

    info: IPlayer = {
        showTimestamp: false,
        showHud: true,
        showChat: true,
        isLogged: false,
        money: 0,
        bankMoney: 0,
        id: 0,
        payCheck: {
            showPayCheck: false,
            money: 0,
            experience: 0,
            minutes: 60,
            seconds: 60,
        },
        version: {
            serverVersion: "0.0.1",
            uiVersion: "0.0.1",
        },
    };

    constructor() {
        makeObservable(this, {
            showAuthentication: observable,
            haveInterfaceOpen: observable,
            info: observable,
            showDisclaimer: observable,

            setShowAuthentication: action,
            updatePlayerInfo: action,
            setHaveInterfaceOpen: action,
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

    updatePlayerInfo(data: DeepPartial<IPlayer>) {
        const newPlayer = merge(this.info, data);

        this.info = newPlayer;
    }
}

export const PlayerStore = new PlayerStoreIMPL();
