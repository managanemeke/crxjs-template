import React from "react";
import { default as Interface } from "./Interface";

export const Checkbox: React.FC<Interface> = (props) => {
  const { checked, onChange } = props;
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};
