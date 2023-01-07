import React, { FC } from "react";
import { useRouteError } from "react-router-dom";

export const ErrorPage: FC = (): JSX.Element => {
    const error: unknown = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{
                    (error instanceof Response && error.statusText)
                    || (error instanceof Error && error.message)
                }</i>
            </p>
        </div>
    );
};