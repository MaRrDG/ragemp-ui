import rpc from "rage-rpc";
import { toast } from "react-toastify";

rpc.on(
    "brw:showToast",
    ({
        type,
        message,
        seconds,
    }: {
        type: "error" | "success" | "warning" | "info";
        message: string;
        seconds: number;
    }) => {
        toast[type](message, {
            position: "bottom-right",
            autoClose: seconds,
            theme: "light",
        });
    }
);
