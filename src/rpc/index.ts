import { Paycheck, Player, PlayerStoreIMPL } from "../stores/PlayerStore";
import * as RPC from "rage-rpc";
import { toast } from "react-toastify";

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

    RPC.on("brw:loadPlayerInfos", ({ player }: { player: Player }) => {
        playerStore?.updatePlayer(player);
    });

    RPC.on("brw:setServerVersion", ({ version }: { version: { serverVersion: string; uiVersion: string } }) => {
        playerStore?.setVersion(version);
    });

    RPC.on("brw:updateHud", ({ money, bankMoney }) => {
        playerStore?.updatePlayer({
            money,
            bankMoney,
        });
    });

    RPC.on("brw:updatePayCheck", (data: Paycheck) => {
        if (data.experience) {
            playerStore?.setPayCheck({
                showPayCheck: true,
            });
        }
        playerStore?.setPayCheck(data);
    });
};
