declare module "*.png";

export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

export interface IPaycheck {
    showPayCheck: boolean;
    money: number;
    experience: number;
    minutes: number;
    seconds: number;
}

export interface IVersion {
    serverVersion: string;
    uiVersion: string;
}

export interface IPlayer {
    showTimestamp: boolean;
    isLogged: boolean;
    showHud: boolean;
    showChat: boolean;
    money: number;
    bankMoney: number;
    id: number;
    payCheck: Paycheck;
    version: IVersion;
}
