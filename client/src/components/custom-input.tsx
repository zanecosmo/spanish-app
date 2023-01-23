import React, { ChangeEvent, FC, useState } from "react";

interface CustomInputProps {
  type?: string;
  id: string;
  name: string;
  placeholder: string;
  initialValue?: string;
  className?: string;
  readOnly?: boolean;
  extractValue: (extract: () => string) => string;
};

const CustomInput: FC<CustomInputProps> = (props) => {
  const [ inputText, setInputText ] = useState(props.initialValue);

  const { type, id, name, placeholder, className, readOnly, extractValue } = props;

  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={inputText}
      className={className}
      readOnly={readOnly}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)}
      }
    />
  );
};

CustomInput.defaultProps = {
  type: "text",
  initialValue: "",
  readOnly: false
};

export { CustomInput };