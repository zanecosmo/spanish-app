import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./src/app";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./src/pages/error-page";
import { LoginPage } from "./src/pages/login-page";

const JSXRouter = createBrowserRouter(createRoutesFromElements(
    <>
        <Route element={<App />} path="/" errorElement={<ErrorPage />} />
        <Route element={<LoginPage />} path="/login" errorElement={<ErrorPage />} />
    </>
))

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        // loader: () => redirect("login"),
        // action: async ({ request }) => {
        //     // const formData = await request.formData();
        //     // for (const entry of formData) {
        //     //     console.log(entry)
        //     // };
        //     // request.
        // }
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />
        
    },
]);

const root = createRoot(document.getElementById("root")!);
root.render(
    <StrictMode>
        <RouterProvider router={JSXRouter}/>
    </StrictMode>
);