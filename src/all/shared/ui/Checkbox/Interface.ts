import {ChangeEventHandler} from "react";

export default interface Interface {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
