import "./App.css";
import { useRef } from "react";
import { useState } from "react";
import { Button } from "shared/ui/Button";
import { Panel } from "shared/ui/Panel";
import { FullScreen, useFullScreenHandle } from "shared/lib/react-full-screen";
import { ReactInfiniteCanvas, ReactInfiniteCanvasHandle, COMPONENT_POSITIONS } from "shared/lib/react-infinite-canvas";
import { StructureRestrictionCheckboxes } from "widgets/StructureRestrictionCheckboxes";

export default function App() {
  const [count, setCount] = useState(0);
  const handle = useFullScreenHandle();
  const canvasRef = useRef<ReactInfiniteCanvasHandle>();

  const token = "e60f99519b4af7b4ac39d484b6b7b0c24d928c7b08d2869871f515105d633be2";
  const request = 9985;

  interface Table {
    length: number;
    checkboxes: Array<Set<number>>;
    links: Array<string>;
    descriptions: Array<string>;
  }

  const table: Table = {
    length: 3,
    checkboxes: [
      new Set([36, 37]),
      new Set([38, 39]),
      new Set([40, 41]),
    ],
    links: [
      "36, 37",
      "38, 39",
      "40, 41",
    ],
    descriptions: [
      "first",
      "second",
      "third",
    ],
  };

  const template = (number: number): string => {
    const array = [];
    for (let i = 1; i <= number; i++) {
      array.push("auto");
    }
    return array.join(" ");
  };

  const links = (array: Array<string>) => {
    const links = [];
    for (const link of array) {
      links.push(<div>{link}</div>);
    }
    return links;
  }

  const descriptions = (array: Array<string>) => {
    const descriptions = [];
    for (const description of array) {
      descriptions.push(<div>{description}</div>);
    }
    return descriptions;
  }

  return (
    <div className="app">
      <h1>Vite + React</h1>
      <div
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateColumns: template(table.length),
          gridTemplateRows: template(table.checkboxes.length)
        }}
      >
        {
          StructureRestrictionCheckboxes({
            token: token,
            request: request,
            currentStructuresArray: table.checkboxes,
          })
        }
        { links(table.links) }
        { descriptions(table.descriptions) }
      </div>
      <Button onClick={() => setCount((count) => count + 1)}>{String(count)}</Button>
      <Button onClick={handle.enter}>fullscreen</Button>
      <FullScreen className="canvas" handle={handle}>
        <ReactInfiniteCanvas
          ref={canvasRef}
          onCanvasMount={(canvasFunc) => {
            canvasFunc.fitContentToView({ scale: 0.5 });
          }}
          customComponents={[
            {
              component: (
                <Panel
                  getCanvasState={() => {
                    return canvasRef.current?.getCanvasState();
                  }}
                />
              ),
              position: COMPONENT_POSITIONS.BOTTOM_LEFT,
              offset: { x: 20, y: 20 },
            },
          ]}
        >
          <div>lala</div>
        </ReactInfiniteCanvas>
      </FullScreen>
    </div>
  );
}
