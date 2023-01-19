import React, { useState } from "react";
import * as RPC from "rage-rpc";
import Authentication from "./layout/authentication";

const App = () => {
    const [showAuthentication, setShowAuthentication] = useState(false);

    RPC.on("brw:showAuthentication", (bool: boolean) => {
        setShowAuthentication(bool);
    });

    return (
        <div className="w-screen h-screen">
            {showAuthentication ? <Authentication /> : null}

            <div className="fixed right-[40%] text-white bottom-0 text-center">
                THIS IS ONLY A PROTOTYPE. ALL THE UI MIGHT BE CHANGED.
            </div>
        </div>
    );
};

export default App;
