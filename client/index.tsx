import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./src/app";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./src/pages/error-page";
import { LoginPage } from "./src/pages/login-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />
    }
]);

const root = createRoot(document.getElementById("root")!);
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);