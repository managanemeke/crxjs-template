import { useEffect } from "react";
import { StructureRestrictionCheckbox } from "features/select-request-structures";

interface Props {
  token: string;
  request: number;
  currentStructuresArray: Array<Set<number>>;
}

const allStructures: Set<number> = new Set();

const Element = (props: Props) => {
  useEffect(() => {
    const initAllStructures = async () => {
      const message = await getMessage(props);
      for (const item of message.inventories) {
        allStructures.add(item.id);
      }
    }
    initAllStructures().then();
  }, [])

  const { token, request, currentStructuresArray } = props;
  const checkboxes = [];
  for (const currentStructures of currentStructuresArray) {
    checkboxes.push(
      <StructureRestrictionCheckbox
        token={token}
        request={request}
        currentStructures={currentStructures}
        allStructures={allStructures}
      />
    )
  }
  return checkboxes;
}

const url = (request: number) => {
  return "https://context.maergroup.ru/api/moderation-requests/" + request;
}

interface Inventory {
  id: number;
  name: string;
}

interface Message {
  inventories: Array<Inventory>
}

const getMessage = async (props: Props): Promise<Message> => {
  const response = await window.fetch(url(props.request), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer" + " " + props.token,
    },
    body: null,
  });
  return response.json();
}

export default Element;