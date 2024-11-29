import {ChangeEventHandler} from "react";

export type CheckboxValue = boolean | "indeterminate";

export default interface Props {
  checked: CheckboxValue;
  onChange: ChangeEventHandler<HTMLInputElement>;
  title?: string;
}
