declare module "*.png";

export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

export interface IPaycheck {
    money: number;
    experience: number;
    minutes: number;
    seconds: number;
}

export interface IVersion {
    serverVersion: string;
    uiVersion: string;
}

export interface IStats {
    admin: number;
    helper: number;
    money: number;
    bankMoney: number;
    level: number;
    hoursPlayed: number;
    points: {
        experience: number;
    };
}

export interface IPlayer {
    showTimestamp: boolean;
    isLogged: boolean;
    showHud: boolean;
    showChat: boolean;
    id: number;
    showAlert: boolean;
    version: IVersion;
    stats: IStats;
}
