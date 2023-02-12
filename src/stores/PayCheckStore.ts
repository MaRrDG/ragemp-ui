import { IPaycheck } from "./../@types/index";
import { action, makeObservable, observable } from "mobx";
import { merge } from "lodash";
import { DeepPartial } from "../@types";

export class PayCheckStoreIMPL {
    payCheck: IPaycheck = {
        money: 0,
        experience: 0,
        minutes: 60,
        seconds: 60,
    };

    constructor() {
        makeObservable(this, {
            payCheck: observable,
            updatePayCheck: action,
        });
    }

    updatePayCheck(data: DeepPartial<IPaycheck>) {
        const newPayCheck = merge(this.payCheck, data);

        this.payCheck = newPayCheck;
    }
}

export const PayCheckStore = new PayCheckStoreIMPL();
