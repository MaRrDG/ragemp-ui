import clsx from "clsx";
import React, { HTMLProps } from "react";

type Theme = "white";
type Size = "normal" | "xl";

interface IProps extends Omit<HTMLProps<HTMLInputElement>, "size"> {
    theme?: Theme;
    size?: Size;
    label?: string;
    secondLabel?: string;
    showChecker?: boolean;
    onSecondLabelClick?: () => void;
}

const themeStyles = {
    white: { label: "text-white", input: "bg-[#F4F4F5] text-indigo-500 placeholder:text-indigo-500" },
};

const sizes = {
    normal: "w-32",
    xl: "w-[458px]",
};

const Input = ({
    theme = "white",
    size = "normal",
    label,
    secondLabel,
    showChecker = true,
    onSecondLabelClick,
    className,
    ...otherProps
}: IProps) => {
    const defaultInputClass =
        "p-4 pr-6 h-[45px] rounded-[12px] border-none outline-none focus:outline-none font-medium";
    const defaultLabelClass = "text-[27px] font-bellota";
    const defaultSecondLabelClass = "text-[16px] font-bellota m-0 p-0 mt-auto mr-2 cursor-pointer";

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                {label ? (
                    <label htmlFor={otherProps.id} className={clsx(defaultLabelClass, themeStyles[theme].label)}>
                        {label}
                    </label>
                ) : null}
                {secondLabel ? (
                    <p
                        aria-hidden="true"
                        onClick={onSecondLabelClick}
                        className={clsx(defaultSecondLabelClass, themeStyles[theme].label)}
                    >
                        {secondLabel}
                    </p>
                ) : null}
            </div>

            <div className="relative">
                <input
                    className={clsx(defaultInputClass, themeStyles[theme].input, sizes[size], className)}
                    {...otherProps}
                />

                {showChecker ? (
                    <div
                        className={clsx(
                            "absolute top-0 right-0 h-full w-[20px] rounded-r-[12px]",
                            otherProps.value ? "bg-[#0eb524]" : "bg-[#B50E0E]"
                        )}
                    ></div>
                ) : null}
            </div>
        </div>
    );
};

export default Input;
