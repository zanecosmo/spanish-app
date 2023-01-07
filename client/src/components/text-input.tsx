import React, { FC } from "react";

export interface InputProps {
    classes: string;
    updateValue: (value: string) => void;
    stateValue: string;
    placeholder: string;
};

export const Input: FC<InputProps> = (props): JSX.Element => {
    const { classes, updateValue, stateValue, placeholder } = props;

    return(
        <input
        className={classes}
        type="text"
        placeholder={placeholder}
        value={stateValue}
        onChange={(e) => updateValue(e.target.value)}>
        </input>
    );
};