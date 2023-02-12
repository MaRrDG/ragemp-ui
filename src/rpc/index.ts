import { PlayerStoreIMPL } from "../stores/PlayerStore";
import * as RPC from "rage-rpc";
import { toast } from "react-toastify";
import { IPaycheck, IPlayer } from "../@types";

export const allRpc = (playerStore: PlayerStoreIMPL) => {
    RPC.on("brw:showAuthentication", (bool: boolean) => {
        playerStore?.setShowAuthentication(bool);
    });

    RPC.on(
        "brw:showToast",
        ({
            type,
            message,
            seconds,
        }: {
            type: "error" | "success" | "warning" | "info";
            message: string;
            seconds: number;
        }) => {
            toast[type](message, {
                position: "bottom-right",
                autoClose: seconds,
                theme: "dark",
            });
        }
    );

    RPC.on("brw:loadPlayerInfos", ({ player }: { player: IPlayer }) => {
        playerStore?.updatePlayerInfo(player);
    });

    RPC.on("brw:setServerVersion", ({ version }: { version: { serverVersion: string; uiVersion: string } }) => {
        playerStore?.updatePlayerInfo({ version });
    });

    RPC.on("brw:updateHud", ({ money, bankMoney }) => {
        playerStore?.updatePlayerInfo({
            money,
            bankMoney,
        });
    });

    RPC.on("brw:updatePayCheck", (data: IPaycheck) => {
        if (data.experience) {
            playerStore?.updatePlayerInfo({
                payCheck: {
                    showPayCheck: true,
                },
            });
        }
        playerStore?.updatePlayerInfo({
            payCheck: data,
        });
    });
};
