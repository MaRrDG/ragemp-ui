import { action, makeObservable, observable } from "mobx";
import { merge } from "lodash";
import { DeepPartial, IPlayer } from "../@types";

export class PlayerStoreIMPL {
    showAuthentication: boolean = false;
    haveInterfaceOpen: boolean = false;
    showDisclaimer: boolean = false;
    showPayCheck: boolean = false;
    showExperienceNeed: boolean = false;

    info: IPlayer = {
        showTimestamp: false,
        showHud: true,
        showChat: true,
        isLogged: false,
        id: 0,
        showAlert: false,
        stats: {
            admin: 0,
            helper: 0,
            money: 0,
            bankMoney: 0,
            level: 0,
            hoursPlayed: 0,
            points: {
                experience: 0,
            },
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
            showPayCheck: observable,
            showExperienceNeed: observable,

            setShowExperienceNeed: action,
            setShowPayCheck: action,
            setShowAuthentication: action,
            updatePlayerInfo: action,
            setHaveInterfaceOpen: action,
            setShowDisclaimer: action,
        });
    }

    setShowExperienceNeed(bool: boolean) {
        this.showExperienceNeed = bool;
    }

    setShowPayCheck(bool: boolean) {
        this.showPayCheck = bool;
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
