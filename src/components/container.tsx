import clsx from "clsx";
import React from "react";

type Theme = "dark";
type Size = "normal" | "full";

type IProps = {
    children: React.ReactNode;
    className?: string;
    theme?: Theme;
    size?: Size;
    rounded?: boolean;
};

const themeStyles = {
    dark: "bg-[#080813]",
};

const themeSize = {
    normal: "w-[1286.63px] h-[735.69px]",
    full: "w-full h-full",
};

const Container = ({ children, className, theme = "dark", size = "normal", rounded = true }: IProps) => {
    return (
        <div className={clsx(rounded ? "rounded-[12px]" : "", themeSize[size], themeStyles[theme], className)}>
            {children}
        </div>
    );
};

export default Container;
