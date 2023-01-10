import React, { FC, MouseEventHandler } from "react";

export interface ButtonProps {
    classes: string;
    text: string;
    onClick: MouseEventHandler<HTMLDivElement>;
};

export const Button: FC<ButtonProps> = (props): JSX.Element =>  {
    const { classes, onClick, text } = props;

    return (
        <div className={classes} onClick={onClick}>{text}</div>
    )
};