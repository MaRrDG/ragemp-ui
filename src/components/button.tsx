import clsx from "clsx";
import React, { HTMLProps } from "react";

type Theme = "primary";
type Size = "normal" | "xl";

interface IProps extends Omit<HTMLProps<HTMLInputElement>, "size"> {
    theme?: Theme;
    size?: Size;
    isSubmit?: boolean;
}

const themeStyles = {
    primary: "bg-[#6366F1] text-white placeholder:text-white",
};

const sizes = {
    normal: "w-32",
    xl: "w-[146px] h-[44px] text-[33px]",
};

const Button = ({ theme = "primary", size = "normal", isSubmit, className, ...otherProps }: IProps) => {
    const defaultInputClass = "cursor-pointer rounded-[12px] border-none outline-none focus:outline-none font-bayon";

    return (
        <div>
            <input
                type={isSubmit ? "submit" : "button"}
                className={clsx(sizes[size], defaultInputClass, themeStyles[theme], className)}
                {...otherProps}
            />
        </div>
    );
};

export default Button;
