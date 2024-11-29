import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";
import { Checkbox } from "shared/ui/Checkbox";

interface Props {
  token: string;
  request: number;
  currentStructures: Set<number>;
  allStructures: Set<number>;
  setAllStructures: Dispatch<SetStateAction<Set<number>>>;
}

const isCheckedNow = (current: Set<number>, all: Set<number>): boolean => {
  for (const number of Array.from(current.values())) {
    if (!(all.has(number))) {
      return false;
    }
  }
  return true;
}

const Element = (props: Props) => {
  const [checked, setChecked] = useState(false);
  useLayoutEffect(() => {
    const next = isCheckedNow(props.currentStructures, props.allStructures);
    if (next !== checked) {
      setChecked(next);
    }
  }, [props.allStructures]);
  return (
    <Checkbox
      checked={checked}
      onChange={() => {
        setChecked(!checked);
        if (!checked) {
          props.setAllStructures(previous => {
            for (const item of props.currentStructures) {
              previous.add(item);
            }
            return previous;
          });
        } else {
          props.setAllStructures(previous => {
            for (const item of props.currentStructures) {
              previous.delete(item);
            }
            return previous;
          });
        }
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
