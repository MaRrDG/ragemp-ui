import { inject, observer } from "mobx-react";
import React, { FC, useEffect } from "react";
import { PlayerStoreIMPL } from "../stores/PlayerStore";
import "./index.css";

type IProps = {
    playerStore?: PlayerStoreIMPL;
};

const PayCheck: FC<IProps> = inject("playerStore")(
    observer(({ playerStore }: IProps) => {
        useEffect(() => {
            setTimeout(() => {
                playerStore?.setPayCheck({
                    showPayCheck: false,
                });
            }, 10000);
        }, []);

        return (
            <div className="absolute top-[40%] -left-2 paycheck-animation">
                <img src="/images/paycheck.png" alt="Paycheck" className="z-2" />
                <div className="absolute text-white top-3 left-4">
                    <p className="m-0 p-0 font-bayon uppercase text-[37px] h-11">Paycheck</p>
                    <p className="m-0 p-0 font-bellota text-[11px]">
                        It’s time for your payday! For the work done you received:
                    </p>
                    <p className="font-bayon uppercase h-5">
                        <span className="mr-1 text-indigo-500">{playerStore?.payCheck.experience}</span>experience
                        POINTS
                    </p>
                    <p className="font-bayon uppercase">
                        <span className="mr-1 text-indigo-500">{playerStore?.payCheck.money.toLocaleString()}$</span>iN
                        YOUR BANK ACCOUNT
                    </p>
                </div>
            </div>
        );
    })
);

export default PayCheck;
