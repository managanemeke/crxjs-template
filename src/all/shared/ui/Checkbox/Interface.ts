import {ChangeEventHandler} from "react";

export type CheckboxValue = boolean | "indeterminate";

export default interface Interface {
  checked: CheckboxValue;
  onChange: ChangeEventHandler<HTMLInputElement>;
  title?: string;
}
