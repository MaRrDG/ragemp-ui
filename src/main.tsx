import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider as MobxProvider } from "mobx-react";
import { PlayerStore as playerStore } from "./stores/PlayerStore";
import { PayCheckStore as payCheckStore } from "./stores/PayCheckStore";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const stores = {
    playerStore,
    payCheckStore,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <MobxProvider {...stores}>
        <ToastContainer
            position="bottom-right"
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
        />

        <App />
    </MobxProvider>
);
