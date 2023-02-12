import { inject, observer } from "mobx-react";
import { FC } from "react";
import { PlayerStoreIMPL } from "../../stores/PlayerStore";
import ExperienceNeed from "./experienceNeed";
import PayCheck from "./payCheck";

type IProps = {
    playerStore?: PlayerStoreIMPL;
};

const Alerts: FC<IProps> = inject("playerStore")(
    observer(({ playerStore }: IProps) => {
        return (
            <>
                {playerStore?.showPayCheck ? <PayCheck /> : null}
                {playerStore?.showExperienceNeed ? <ExperienceNeed /> : null}
            </>
        );
    })
);

export default Alerts;
