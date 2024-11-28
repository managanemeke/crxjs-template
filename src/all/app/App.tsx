import "./App.css";
import { useRef } from "react";
import { useState } from "react";
import { Button } from "shared/ui/Button";
import { Panel } from "shared/ui/Panel";
import { FullScreen, useFullScreenHandle } from "shared/lib/react-full-screen";
import { ReactInfiniteCanvas, ReactInfiniteCanvasHandle, COMPONENT_POSITIONS } from "shared/lib/react-infinite-canvas";
import { StructureRestrictionCheckbox } from "features/select-request-structures";

export default function App() {
  const [count, setCount] = useState(0);
  const handle = useFullScreenHandle();
  const canvasRef = useRef<ReactInfiniteCanvasHandle>();
  return (
    <div className="app">
      <h1>Vite + React</h1>
      <StructureRestrictionCheckbox />
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
