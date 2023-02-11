import React, { FC, useEffect } from "react";
import Authentication from "./layout/authentication";
import { PlayerStoreIMPL } from "./stores/PlayerStore";
import { inject, observer } from "mobx-react";
import Chat from "./layout/chat";
import clsx from "clsx";
import Hud from "./layout/hud";
import { allRpc } from "./rpc";
import PayCheck from "./layout/payCheck";

type IProps = {
    playerStore?: PlayerStoreIMPL;
};

const App: FC<IProps> = inject("playerStore")(
    observer(({ playerStore }: IProps) => {
        useEffect(() => {
            allRpc(playerStore!);
        }, [window.mp]);

        return (
            <div
                className={clsx(
                    "w-screen h-screen p-2 relative",
                    !playerStore?.player.isLogged ? "bg-[#080813]/70" : ""
                )}
            >
                {playerStore?.showAuthentication ? <Authentication /> : null}
                <Hud />
                {playerStore?.payCheck.showPayCheck ? <PayCheck /> : null}
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
