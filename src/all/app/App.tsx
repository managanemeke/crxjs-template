import "./App.css";
import React, { useRef } from "react";
import { useState } from "react";
import { Button } from "shared/ui/Button";
import { Panel } from "shared/ui/Panel";
import { FullScreen, useFullScreenHandle } from "shared/lib/react-full-screen";
import { ReactInfiniteCanvas, ReactInfiniteCanvasHandle, COMPONENT_POSITIONS } from "shared/lib/react-infinite-canvas";
import { Checkbox } from "shared/ui/Checkbox";

export default function App() {
  const [count, setCount] = useState(0);
  const handle = useFullScreenHandle();
  const canvasRef = useRef<ReactInfiniteCanvasHandle>();

  const [checked, setChecked] = React.useState(false);

  return (
    <div className="app">
      <h1>Vite + React</h1>
      <Checkbox
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
      />
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
