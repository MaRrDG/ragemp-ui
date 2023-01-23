import dayjs from "dayjs";
import { inject, observer } from "mobx-react";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { PlayerStoreIMPL } from "../stores/PlayerStore";

type IProps = {
    playerStore?: PlayerStoreIMPL;
};

type IMessages = {
    text: string;
    timestamp: string;
};

const Chat: FC<IProps> = inject("playerStore")(
    observer(({ playerStore }: IProps) => {
        const [showChat, setShowChat] = useState(true);
        const [showTextInput, setShowTextInput] = useState(false);
        const [messages, setMessages] = useState<IMessages[]>([]);
        const [currentMessage, setCurrentMessage] = useState("");
        const divToScroll = useRef<any>(null);
        const inputRef = useRef<any>(null);

        const chatAPI = {
            clear: () => {
                setMessages([]);
                for (let i = 0; i < 50; i++) chatAPI.push(" ");
            },

            push: (text: any) => {
                if (text.length < 1) return;

                setMessages((prev) => [
                    ...prev,
                    {
                        timestamp: `${dayjs().format("HH:mm:ss")}`,
                        text: text,
                    },
                ]);
                setShowTextInput(false);
                setCurrentMessage("");
            },

            activate: (toggle: boolean) => {
                if (playerStore?.haveInterfaceOpen) return setShowTextInput(false);
                setShowTextInput(toggle);
            },

            show: (toggle: boolean) => {
                if (playerStore?.haveInterfaceOpen) return setShowChat(false);
                setShowChat(toggle);
            },
        };

        const api = {
            "chat:push": chatAPI.push,
            "chat:clear": chatAPI.clear,
            "chat:activate": chatAPI.activate,
            "chat:show": chatAPI.show,
        };

        for (const fn in api) {
            // @ts-ignore
            mp.events.add(fn, api[fn]);
        }

        const chatInvoke = (bool: boolean) => {
            mp.invoke("focus", bool);
            mp.invoke("setTypingInChatState", bool);
        };

        const onKeyDownListener = (event: any) => {
            // T KEY
            if (event.keyCode === 84) {
                if (playerStore?.haveInterfaceOpen || inputRef.current) return;
                chatInvoke(true);
                setShowTextInput(true);
                inputRef.current = true;
                event.preventDefault();
            }

            // ESC KEY
            if (event.keyCode === 27) {
                if (showTextInput && showChat) return;
                setShowTextInput(false);
                chatInvoke(false);
            }
        };

        useEffect(() => {
            window.addEventListener("keydown", onKeyDownListener);

            return () => {
                window.addEventListener("keydown", onKeyDownListener);
            };
        }, []);

        useEffect(() => {
            divToScroll.current.scrollIntoView({ behavior: "smooth" });
        }, [messages]);

        useEffect(() => {
            const chatInput = document.getElementById("chatInput");

            if (chatInput) {
                chatInput?.focus();
            }
        }, [showTextInput]);

        if (!showChat || playerStore?.haveInterfaceOpen) return null;
        return (
            <div className="w-[37em] chat text-white font-sans">
                <div
                    id="chat-container"
                    className="h-[20em] outline-none overflow-auto break-words flex flex-col gap-2 chat-text-container direction-rtl"
                >
                    {messages.map((elem, idx) => (
                        <div key={idx} className="flex gap-1 direction-ltr ml-2 stroke">
                            {playerStore?.player.showTimestamp ? (
                                <p className="font-medium">[{elem.timestamp}]</p>
                            ) : null}
                            <div dangerouslySetInnerHTML={{ __html: elem.text }} />
                        </div>
                    ))}

                    <div ref={divToScroll} />
                </div>
                {showTextInput ? (
                    <div className="w-full relative">
                        <input
                            type="text"
                            name="textMessage"
                            id="chatInput"
                            ref={inputRef}
                            placeholder="Write a message"
                            className="w-full mt-2 h-10 placeholder:text-white rounded-md bg-black/25 text-white p-4 pr-14 outline-none"
                            value={currentMessage}
                            onKeyUp={(event) => {
                                if (event.keyCode === 13) {
                                    if (!showTextInput) return;
                                    event.preventDefault();

                                    let message = currentMessage.trim();

                                    if (message.length < 1) return setShowTextInput(false);

                                    if (message[0] == "/") {
                                        if (message.length < 2) return setShowTextInput(false);

                                        mp.invoke("command", message.substr(1));
                                    } else {
                                        mp.invoke("chatMessage", message);
                                    }

                                    setShowTextInput(false);
                                    chatInvoke(false);
                                    inputRef.current = false;
                                }
                            }}
                            onChange={(e) => {
                                if (e.target.value.length > 120) return;
                                setCurrentMessage(e.target.value);
                            }}
                        />
                        <p className="absolute right-2 top-4">{currentMessage.length}/120</p>
                    </div>
                ) : null}
            </div>
        );
    })
);

export default Chat;
