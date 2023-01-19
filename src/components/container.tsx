import clsx from "clsx";
import React from "react";

type IProps = {
    children: React.ReactNode;
    className?: string;
};

const Container = ({ children, className }: IProps) => {
    return <div className={clsx("w-[52rem] h-[26rem]", className)}>{children}</div>;
};

export default Container;
