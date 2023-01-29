import clsx from "clsx";
import React from "react";

type Theme = "dark";

type IProps = {
    children: React.ReactNode;
    className?: string;
    theme?: Theme;
};

const themeStyles = {
    dark: "bg-[#080813]",
};

const Container = ({ children, className, theme = "dark" }: IProps) => {
    return (
        <div className={clsx("w-[1286.63px] h-[735.69px] rounded-[12px]", themeStyles[theme], className)}>
            {children}
        </div>
    );
};

export default Container;
