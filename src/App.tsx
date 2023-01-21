import React, { FC } from "react";
import Authentication from "./layout/authentication";
import rpc from "rage-rpc";
import { PlayerStoreIMPL } from "./stores/PlayerStore";
import { inject, observer } from "mobx-react";

type IProps = {
    playerStore?: PlayerStoreIMPL;
};

const App: FC<IProps> = inject("playerStore")(
    observer(({ playerStore }: IProps) => {
        rpc.on("brw:showAuthentication", (bool: boolean) => {
            playerStore?.setShowAuthentication(bool);
        });

        return (
            <div className="w-screen h-screen">
                {playerStore?.showAuthentication ? <Authentication /> : null}

                <div className="fixed right-[40%] text-white bottom-0 text-center">
                    THIS IS ONLY A PROTOTYPE. ALL THE UI MIGHT BE CHANGED.
                </div>
            </div>
        );
    })
);

export default App;
