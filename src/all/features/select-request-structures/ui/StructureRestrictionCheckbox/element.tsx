import React from "react";
import { Checkbox } from "shared/ui/Checkbox";

interface Props {
  token: string;
  request: number;
  currentStructures: Set<number>;
  allStructures: Set<number>;
}

const Element = (props: Props) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox
      checked={checked}
      onChange={() => {
        setChecked(!checked);
        if (!checked) {
          for (const item of props.currentStructures) {
            props.allStructures.add(item);
          }
        } else {
          for (const item of props.currentStructures) {
            props.allStructures.delete(item);
          }
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
