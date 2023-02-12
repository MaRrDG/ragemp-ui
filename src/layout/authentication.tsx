import React, { FC, FormEvent, useState } from "react";
import Container from "../components/container";
import * as RPC from "rage-rpc";

import "./index.css";
import Input from "../components/input";
import Button from "../components/button";
import { inject, observer } from "mobx-react";
import { PlayerStoreIMPL } from "../stores/PlayerStore";
import { toast } from "react-toastify";

type IProps = {
    playerStore?: PlayerStoreIMPL;
};

const Authentication: FC<IProps> = inject("playerStore")(
    observer(({ playerStore }: IProps) => {
        const [authType, setAuthType] = useState<"login" | "register">("login");
        const [currentAuthInformationCompleted, setCurrentAuthInformationCompleted] = useState<{
            username: string;
            email?: string;
            password: string;
        }>({
            email: "",
            username: "",
            password: "",
        });

        const onSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (authType === "login") {
                RPC.callServer("brw:checkPlayerCredentials", currentAuthInformationCompleted);
            } else {
                RPC.callServer("brw:createPlayerCredentials", currentAuthInformationCompleted);
            }

            playerStore?.setShowDisclaimer(true);
            playerStore?.updatePlayerInfo({ isLogged: true });
        };

        return (
            <div className="z-50 container ">
                <div className="w-full h-full flex items-center justify-center">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <Container className="flex flex-col items-center justify-around relative">
                            {authType === "login" ? (
                                <>
                                    <div className="absolute top-0 right-28 w-[30rem] h-auto flex flex-col items-center justify-center z-10">
                                        <h1 className="font-bayon text-[138px] text-white m-0 p-0">LOGIN</h1>
                                        <div className="mt-[85px]">
                                            <Input
                                                size="xl"
                                                type="text"
                                                required
                                                label="Username"
                                                value={currentAuthInformationCompleted.username}
                                                onChange={(e: any) => {
                                                    setCurrentAuthInformationCompleted({
                                                        ...currentAuthInformationCompleted,
                                                        username: e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="mt-[60px]">
                                            <Input
                                                size="xl"
                                                label="Password"
                                                required
                                                type="password"
                                                secondLabel="Forgot password"
                                                value={currentAuthInformationCompleted.password}
                                                onSecondLabelClick={() => {
                                                    toast.error("This feature is not implemented", {
                                                        position: "bottom-right",
                                                        autoClose: 5000,
                                                        theme: "dark",
                                                    });
                                                }}
                                                onChange={(e: any) => {
                                                    setCurrentAuthInformationCompleted({
                                                        ...currentAuthInformationCompleted,
                                                        password: e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="mt-[34px] flex items-center justify-center flex-col ">
                                            <Button size="xl" isSubmit value="Submit" />
                                            <p
                                                aria-hidden="true"
                                                onClick={() => {
                                                    setAuthType("register");
                                                }}
                                                className="mt-[6px] cursor-pointer font-bellota text-[16px] text-white"
                                            >
                                                You don’t have an account?
                                            </p>
                                        </div>
                                    </div>

                                    <img src="/images/login-wave.png" className="absolute z-0" alt="Character" />
                                    <div className="absolute bottom-[5px] right-2 text-right font-bellota text-white text-[12px]">
                                        <p>UI VERSION: {playerStore?.info.version.uiVersion}</p>
                                        <p>SERVER VERSION: {playerStore?.info.version.serverVersion}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="absolute top-0 left-28 w-[30rem] h-auto flex flex-col items-center justify-center z-10">
                                        <h1 className="font-bayon text-[138px] text-white m-0 p-0">REGISTER</h1>
                                        <div className="mt-[85px]">
                                            <Input
                                                size="xl"
                                                type="text"
                                                required
                                                label="Username"
                                                value={currentAuthInformationCompleted.username}
                                                onChange={(e: any) => {
                                                    setCurrentAuthInformationCompleted({
                                                        ...currentAuthInformationCompleted,
                                                        username: e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="mt-[12px]">
                                            <Input
                                                size="xl"
                                                label="Email:"
                                                required
                                                type="email"
                                                value={currentAuthInformationCompleted.email}
                                                onChange={(e: any) => {
                                                    setCurrentAuthInformationCompleted({
                                                        ...currentAuthInformationCompleted,
                                                        email: e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="mt-[12px]">
                                            <Input
                                                size="xl"
                                                label="Password"
                                                required
                                                type="password"
                                                value={currentAuthInformationCompleted.password}
                                                onChange={(e: any) => {
                                                    setCurrentAuthInformationCompleted({
                                                        ...currentAuthInformationCompleted,
                                                        password: e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="mt-[34px] flex items-center justify-center flex-col ">
                                            <Button size="xl" isSubmit value="Submit" />
                                            <p
                                                aria-hidden="true"
                                                onClick={() => {
                                                    setAuthType("login");
                                                }}
                                                className="mt-[6px] cursor-pointer font-bellota text-[16px] text-white"
                                            >
                                                You already have an account?
                                            </p>
                                        </div>
                                    </div>

                                    <img
                                        src="/images/login-wave-right.png"
                                        className="absolute right-0 z-0"
                                        alt="Character"
                                    />
                                    <div className="absolute bottom-[5px] left-2 text-left font-bellota text-white text-[12px]">
                                        <p>UI VERSION: {playerStore?.info.version.uiVersion}</p>
                                        <p>SERVER VERSION: {playerStore?.info.version.serverVersion}</p>
                                    </div>
                                </>
                            )}
                        </Container>
                    </form>
                    {authType === "login" ? (
                        <img src="/images/gtavgirl.png" className="w-[850px] absolute -left-[6rem] " alt="Character" />
                    ) : (
                        <img src="/images/gtavman.png" className="w-[600px] absolute -right-[12rem] " alt="Character" />
                    )}
                </div>
            </div>
        );
    })
);

export default Authentication;
