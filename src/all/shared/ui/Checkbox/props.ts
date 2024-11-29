import {CheckboxValue} from "./types";
import {ChangeEventHandler} from "react";

export default interface Props {
  value: CheckboxValue;
  onChange: ChangeEventHandler<HTMLInputElement>;
  title?: string;
}
