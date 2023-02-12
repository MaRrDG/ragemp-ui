import { inject, observer } from "mobx-react";
import React, { FC } from "react";
import Alert from "../../components/alert";
import { PayCheckStoreIMPL } from "../../stores/PayCheckStore";
import { PlayerStoreIMPL } from "../../stores/PlayerStore";
import "../index.css";

type IProps = {
    playerStore?: PlayerStoreIMPL;
    payCheckStore?: PayCheckStoreIMPL;
};

const PayCheck: FC<IProps> = inject(
    "playerStore",
    "payCheckStore"
)(
    observer(({ playerStore, payCheckStore }: IProps) => {
        return (
            <Alert
                show={playerStore?.showPayCheck || false}
                title="Paycheck"
                onHide={() => {
                    playerStore?.setShowPayCheck(false);
                    setTimeout(() => {
                        playerStore?.setShowExperienceNeed(true);
                    }, 150);
                }}
                subTitle={
                    <div>
                        <p className="m-0 p-0 font-bellota text-[11px]">
                            It’s time for your payday! For the work done you received:
                        </p>
                        <p className="font-bayon uppercase h-5">
                            <span className="mr-1 text-indigo-500">{payCheckStore?.payCheck.experience}</span>
                            experience POINTS
                        </p>
                        <p className="font-bayon uppercase">
                            <span className="mr-1 text-indigo-500">
                                {payCheckStore?.payCheck.money.toLocaleString()}$
                            </span>
                            iN YOUR BANK ACCOUNT
                        </p>
                    </div>
                }
            />
        );
    })
);

export default PayCheck;
