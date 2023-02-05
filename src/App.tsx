import React, { FC, useEffect } from "react";
import Authentication from "./layout/authentication";
import * as RPC from "rage-rpc";
import { Player, PlayerStoreIMPL } from "./stores/PlayerStore";
import { inject, observer } from "mobx-react";
import Chat from "./layout/chat";
import { toast } from "react-toastify";
import clsx from "clsx";

type IProps = {
    playerStore?: PlayerStoreIMPL;
};

const App: FC<IProps> = inject("playerStore")(
    observer(({ playerStore }: IProps) => {
        useEffect(() => {
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
        }, [window.mp]);

        return (
            <div
                className={clsx(
                    "w-screen h-screen p-2 relative",
                    !playerStore?.player.isLogged ? "bg-[#080813]/70" : ""
                )}
            >
                {playerStore?.showAuthentication ? <Authentication /> : null}
                <Chat />

                {playerStore?.showDisclaimer ? (
                    <div className="fixed right-[40%] text-white bottom-0 text-center">
                        THIS IS ONLY A PROTOTYPE. ALL THE UI MIGHT BE CHANGED.
                    </div>
                ) : null}
            </div>
        );
    })
);

export default App;
