import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./src/app";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./src/pages/error-page";
import { TestRoot } from "./src/components/router-tests/test-root";
import { TestNonRoot } from "./src/components/router-tests/test-non-root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TestRoot />,
        errorElement: <ErrorPage />,
    },
    {
        path: "non-root",
        element: <TestNonRoot />,
        errorElement: <ErrorPage />
        
    },
]);

const root = createRoot(document.getElementById("root")!);
root.render(
    <StrictMode>
        <App />
        {/* <RouterProvider router={router}/> */}
    </StrictMode>
);