import React from "react";
import { Checkbox } from "shared/ui/Checkbox";

const Element = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox
      checked={checked}
      onChange={() => {
        setChecked(!checked);
      }}
    />
  );
}

export default Element;
