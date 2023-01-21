import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider as MobxProvider } from "mobx-react";
import { PlayerStore as playerStore } from "./stores/PlayerStore";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "./rpcs";
import { ToastContainer } from "react-toastify";

const stores = {
    playerStore,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <MobxProvider {...stores}>
        <ToastContainer
            position="bottom-right"
            theme="light"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
        />

        <App />
    </MobxProvider>
);
