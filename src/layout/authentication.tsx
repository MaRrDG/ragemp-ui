import React, { FormEvent, useState } from "react";
import Container from "../components/container";
import * as RPC from "rage-rpc";
import "./index.css";

// TODO: Fa o componenta pentru Input si Button care sa aibe prestabilite niste teme.

const Authentication = () => {
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
    };

    return (
        <div className="z-50 container">
            <div className="w-full h-full flex items-center justify-center">
                <Container className="bg-gray-200 border-1 shadow-md rounded-lg p-24 flex flex-col items-center justify-around">
                    {authType === "login" ? (
                        <>
                            <form
                                onSubmit={(e) => onSubmit(e)}
                                className="flex flex-col items-center mt-2 space-y-6 mb-6"
                            >
                                <h1 className="font-medium text-3xl uppercase">Login</h1>
                                <input
                                    type="text"
                                    value={currentAuthInformationCompleted.username}
                                    onChange={(e) => {
                                        setCurrentAuthInformationCompleted((prev) => {
                                            return {
                                                ...prev,
                                                username: e.target.value,
                                            };
                                        });
                                    }}
                                    placeholder="Username"
                                    className="w-[22rem] text-white placeholder:text-white h-[3rem] bg-gray-400 rounded-lg p-4"
                                    required
                                />
                                <input
                                    placeholder="Password"
                                    value={currentAuthInformationCompleted.password}
                                    onChange={(e) => {
                                        setCurrentAuthInformationCompleted((prev) => {
                                            return {
                                                ...prev,
                                                password: e.target.value,
                                            };
                                        });
                                    }}
                                    type="password"
                                    className="w-[22rem] text-white placeholder:text-white h-[3rem] bg-gray-400 rounded-lg p-4"
                                    required
                                />
                                <input
                                    type="submit"
                                    value="SUBMIT"
                                    className="w-24 font-medium h-8 bg-gray-300 rounded-lg text-gray-900"
                                />
                            </form>
                            <p className="mt-2 font-medium text-xl">
                                You don't have an account?{" "}
                                <span
                                    aria-hidden="true"
                                    onClick={() => {
                                        setAuthType("register");
                                        setCurrentAuthInformationCompleted({
                                            email: "",
                                            username: "",
                                            password: "",
                                        });
                                    }}
                                    className="text-blue-700 cursor-pointer"
                                >
                                    Create one
                                </span>
                                .
                            </p>
                        </>
                    ) : (
                        <>
                            <form
                                onSubmit={(e) => onSubmit(e)}
                                className="flex flex-col items-center mt-2 space-y-6 mb-6"
                            >
                                <h1 className="font-medium text-3xl uppercase">Register</h1>
                                <input
                                    type="text"
                                    value={currentAuthInformationCompleted.username}
                                    onChange={(e) => {
                                        setCurrentAuthInformationCompleted((prev) => {
                                            return {
                                                ...prev,
                                                username: e.target.value,
                                            };
                                        });
                                    }}
                                    placeholder="Username"
                                    className="w-[22rem] h-[3rem] text-white placeholder:text-white bg-gray-400 rounded-lg p-4"
                                    required
                                />
                                <input
                                    type="email"
                                    value={currentAuthInformationCompleted.email}
                                    placeholder="Email"
                                    onChange={(e) => {
                                        setCurrentAuthInformationCompleted((prev) => {
                                            return {
                                                ...prev,
                                                email: e.target.value,
                                            };
                                        });
                                    }}
                                    className="w-[22rem] h-[3rem] text-white placeholder:text-white bg-gray-400 rounded-lg p-4"
                                    required
                                />
                                <input
                                    value={currentAuthInformationCompleted.password}
                                    onChange={(e) => {
                                        setCurrentAuthInformationCompleted((prev) => {
                                            return {
                                                ...prev,
                                                password: e.target.value,
                                            };
                                        });
                                    }}
                                    placeholder="Password"
                                    type="password"
                                    className="w-[22rem] h-[3rem] text-white placeholder:text-white bg-gray-400 rounded-lg p-4"
                                    required
                                />
                                <input
                                    type="submit"
                                    value="SUBMIT"
                                    className="w-24 font-medium h-8 bg-gray-300 rounded-lg text-gray-900"
                                />
                            </form>
                            <p className="mt-2 font-medium text-xl">
                                You already have an account?{" "}
                                <span
                                    aria-hidden="true"
                                    onClick={() => {
                                        setAuthType("login");
                                        setCurrentAuthInformationCompleted({
                                            email: "",
                                            username: "",
                                            password: "",
                                        });
                                    }}
                                    className="text-blue-700 cursor-pointer"
                                >
                                    Login to it
                                </span>
                                .
                            </p>
                        </>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default Authentication;
