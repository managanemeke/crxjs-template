import { Checkbox } from "shared/ui/Checkbox";
import { CheckboxValue } from "shared/ui/Checkbox";
import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";

interface Props {
  token: string;
  request: number;
  currentStructures: Set<number>;
  allStructures: Set<number>;
  setAllStructures: Dispatch<SetStateAction<Set<number>>>;
}

const nextValue = (current: Set<number>, all: Set<number>): CheckboxValue => {
  let selected = 0;
  for (const number of Array.from(current.values())) {
    if (all.has(number)) {
      selected++;
    }
  }
  if (selected === current.size) {
    return true;
  }
  if (selected === 0) {
    return false;
  }
  return "indeterminate";
}

const nextCheckboxValue = (current: CheckboxValue): CheckboxValue => {
  switch (current) {
    case true:
    case "indeterminate":
      return false;
    case false:
      return true;
  }
}

const Element = (props: Props) => {
  const [value, setValue] = useState(false as CheckboxValue);
  useLayoutEffect(() => {
    const next = nextValue(props.currentStructures, props.allStructures);
    if (next !== value) {
      setValue(next);
    }
  }, [props.allStructures]);
  return (
    <Checkbox
      value={value}
      onChange={() => {
        switch (value) {
          case true:
          case "indeterminate":
            props.setAllStructures(previous => {
              for (const item of props.currentStructures) {
                previous.delete(item);
              }
              return previous;
            });
            break;
          case false:
            props.setAllStructures(previous => {
              for (const item of props.currentStructures) {
                previous.add(item);
              }
              return previous;
            });
            break;
        }
        const next = nextCheckboxValue(value);
        setValue(next);
        sendMessage(props).then();
      }}
      title={Array.from(props.currentStructures).join(", ")}
    />
  );
}

const url = (request: number) => {
  return "https://context.maergroup.ru/api/moderation-requests/" + request + "/inventory";
}

const sendMessage = async (props: Props) => {
  interface Message {
    inventoryIds: Array<number>
  }
  const response = await window.fetch(url(props.request), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer" + " " + props.token,
    },
    body: JSON.stringify({
      inventoryIds: Array.from(props.allStructures.values())
    } as Message),
  });
  return response.json();
}

export default Element;
