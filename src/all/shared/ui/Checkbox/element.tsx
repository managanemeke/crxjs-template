import { FC, useEffect, useRef } from "react";
import { default as CheckboxProps } from "./props";

const Checkbox: FC<CheckboxProps> = (props) => {
  const { value, onChange, title } = props;
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const indeterminate = value === "indeterminate";
    if (
      indeterminate
      && ref.current
    ) {
      ref.current.indeterminate = true;
    }
  }, [value]);
  return (
    <input
      type="checkbox"
      ref={ref}
      checked={value && value !== "indeterminate"}
      onChange={onChange}
      title={title ?? ""}
    />
  );
};

export default Checkbox;
