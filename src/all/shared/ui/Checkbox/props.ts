import {ChangeEventHandler} from "react";
import {CheckboxValue} from "./types";

export default interface Props {
  checked: CheckboxValue;
  onChange: ChangeEventHandler<HTMLInputElement>;
  title?: string;
}
