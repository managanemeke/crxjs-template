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

  return (
    <div className="app">
      <h1>Vite + React</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gridTemplateRows: "auto auto auto",
          gridAutoFlow: "column"
        }}
      >
        {
          StructureRestrictionCheckboxes({
            token: token,
            request: request,
            currentStructuresArray: [
              new Set([36, 37]),
              new Set([38, 39]),
              new Set([40, 41])
            ]
          })
        }
        <div>36, 37</div>
        <div>38, 39</div>
        <div>40, 41</div>
        <div>first</div>
        <div>second</div>
        <div>third</div>
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
