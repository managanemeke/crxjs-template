import { FC, useEffect, useRef } from "react";
import { default as CheckboxProps } from "./Interface";

const Checkbox: FC<CheckboxProps> = (props) => {
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

export default Checkbox;
