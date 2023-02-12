import React, { FC } from "react";
import { Clock } from "../assets/icons/clock";
import { UserIcon, BanknotesIcon } from "@heroicons/react/24/solid";
import { Star } from "../assets/icons/starts";
import { inject, observer } from "mobx-react";
import { PlayerStoreIMPL } from "../stores/PlayerStore";
import dayjs from "dayjs";
import { PayCheckStoreIMPL } from "../stores/PayCheckStore";

type IProps = {
    playerStore?: PlayerStoreIMPL;
    payCheckStore?: PayCheckStoreIMPL;
};

const Hud: FC<IProps> = inject(
    "playerStore",
    "payCheckStore"
)(
    observer(({ playerStore, payCheckStore }: IProps) => {
        if (playerStore?.haveInterfaceOpen || !playerStore?.info.showHud) return null;

        return (
            <div className="absolute flex gap-[6px] right-[19px]">
                <div className="flex flex-col mt-4">
                    <div className="flex gap-x-2">
                        <div className="flex items-center justify-center gap-x-1">
                            <Clock />
                            <span className="mt-[0.5px] font-bayon text-[16px] text-white">
                                {dayjs().format("HH:mm")}{" "}
                                <span className="text-indigo-500/70">{dayjs().format("DD.MM.YYYY")}</span>
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-x-1">
                            <UserIcon width="16" className="text-white" />
                            <span className="mt-[0.5px] font-bayon text-[16px] text-white">
                                #{playerStore?.info.id}
                            </span>
                        </div>
                    </div>
                    <span className="font-bayon text-white text-[24px] h-8 text-right">
                        ${playerStore?.info.stats.money.toLocaleString()}
                    </span>
                    <span className="font-bayon text-indigo-500/70 text-[18px] text-right">
                        ${playerStore?.info.stats.bankMoney.toLocaleString()}
                    </span>
                    <div className="flex mt-1 ml-auto w-[80px] h-[31px] text-indigo-500/20 border-[2px] border-solid border-white rounded-[10px] items-center justify-center font-bayon text-white">
                        <BanknotesIcon className="text-indigo-500 w-[1rem]" />
                        <span className="ml-[6px] text-white">
                            {payCheckStore!.payCheck.minutes < 10
                                ? `0${payCheckStore?.payCheck.minutes}`
                                : payCheckStore?.payCheck.minutes}
                            :
                            {payCheckStore!.payCheck.seconds < 10
                                ? `0${payCheckStore?.payCheck.seconds}`
                                : payCheckStore?.payCheck.seconds}
                        </span>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col items-end justify-end">
                        <span className="font-bayon text-white p-0 m-0 text-[59px] text-center h-[60px]">YOUR</span>
                        <span className="font-bayon tracking-[0.17em] text-indigo-500/70 text-[27.6px] p-0 m-0">
                            SERVER
                        </span>
                        <div className="flex items-end justify-end">
                            <Star />
                            <Star />
                            <Star color="#fff" />
                            <Star color="#fff" />
                            <Star color="#fff" />
                        </div>
                    </div>
                </div>
            </div>
        );
    })
);

export default Hud;
