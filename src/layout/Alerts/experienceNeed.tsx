import { inject, observer } from "mobx-react";
import React, { FC } from "react";
import Alert from "../../components/alert";
import { PlayerStoreIMPL } from "../../stores/PlayerStore";
import "../index.css";

type IProps = {
    playerStore?: PlayerStoreIMPL;
};

const ExperienceNeed: FC<IProps> = inject("playerStore")(
    observer(({ playerStore }: IProps) => {
        return (
            <Alert
                show={playerStore?.showExperienceNeed || false}
                title="Level system"
                onHide={() => {
                    playerStore?.setShowExperienceNeed(false);
                }}
                subTitle={
                    <div>
                        <p className="font-bellota text-[16px] pr-[7.5rem]">
                            You need more{" "}
                            <span className="m-0 text-indigo-500">
                                {playerStore!.info.stats.level * 250 - playerStore!.info.stats.points.experience}
                            </span>{" "}
                            experience to advance to level{" "}
                            <span className="m-0 text-indigo-500">{playerStore!.info.stats.level + 1}</span>!
                        </p>
                    </div>
                }
            />
        );
    })
);

export default ExperienceNeed;
