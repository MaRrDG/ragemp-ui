import React, { FC, useEffect } from "react";
import Authentication from "./layout/authentication";
import { PlayerStoreIMPL } from "./stores/PlayerStore";
import { inject, observer } from "mobx-react";
import Chat from "./layout/chat";
import clsx from "clsx";
import Hud from "./layout/hud";
import { allRpc } from "./rpc";
import Alerts from "./layout/Alerts";
import { PayCheckStoreIMPL } from "./stores/PayCheckStore";

type IProps = {
    playerStore?: PlayerStoreIMPL;
    payCheckStore?: PayCheckStoreIMPL;
};

const App: FC<IProps> = inject(
    "playerStore",
    "payCheckStore"
)(
    observer(({ playerStore, payCheckStore }: IProps) => {
        useEffect(() => {
            allRpc(playerStore!, payCheckStore!);
        }, [window.mp]);

        return (
            <div
                className={clsx("w-screen h-screen p-2 relative", !playerStore?.info.isLogged ? "bg-[#080813]/70" : "")}
            >
                {playerStore?.showAuthentication ? <Authentication /> : null}
                <Hud />
                <Alerts />
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
