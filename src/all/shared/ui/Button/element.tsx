import clsx from "clsx";
import { FC } from "react";

import "./element.css";
import { default as Interface } from "./Interface";

export const Button: FC<Interface> = (props) => {
  const {
    children,
    disabled = false,
    className,
    onClick,
  } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "button",
        disabled && "button_disabled",
        className
      )}>
      {children}
    </button>
  );
}
