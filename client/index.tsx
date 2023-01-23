import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./src/app";

const root = createRoot(document.getElementById("root")!);
root.render(
    <StrictMode>
        <App />
        {/* <RouterProvider router={router}/> */}
    </StrictMode>
);