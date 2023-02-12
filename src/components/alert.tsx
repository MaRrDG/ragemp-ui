import React, { ReactNode, useEffect, useRef, useState } from "react";

type IProps = {
    show: boolean;
    onHide: () => void;
    seconds?: number;
    title: string;
    subTitle: ReactNode;
};

const Alert = ({ show, seconds = 4500, onHide, title, subTitle }: IProps) => {
    let audio = new Audio("/public/sounds/alert.mp3");
    const payCheckRef = useRef<any>(null);

    useEffect(() => {
        audio.play();
        audio.volume = 0.5;
        payCheckRef.current.style.animationDuration = `${seconds}ms`;

        setTimeout(() => {
            onHide();
        }, seconds);
    }, []);

    if (!show) return null;
    return (
        <div ref={payCheckRef} id="paycheck" className="absolute top-[40%] -left-[50%] paycheck-animation">
            <img src="/images/paycheck.png" alt="Paycheck" className="z-2 opacity-70" />
            <div className="absolute text-white top-3 left-4 flex flex-col">
                <p className="font-bayon uppercase text-[37px] h-11">{title}</p>
                {subTitle}
            </div>
        </div>
    );
};

export default Alert;
