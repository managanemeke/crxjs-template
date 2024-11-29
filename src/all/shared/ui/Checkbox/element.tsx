import { FC, useEffect, useRef } from "react";
import { default as Interface } from "./Interface";

export const Checkbox: FC<Interface> = (props) => {
  const { checked, onChange, title } = props;
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const indeterminate = checked === "indeterminate";
    if (
      indeterminate
      && ref.current
    ) {
      ref.current.indeterminate = true;
    }
  }, [checked]);
  return (
    <input
      type="checkbox"
      ref={ref}
      checked={checked && checked !== "indeterminate"}
      onChange={onChange}
      title={title ?? ""}
    />
  );
};
