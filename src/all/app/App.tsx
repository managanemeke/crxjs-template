import "./App.css";
import { useState } from "react";
import { Button } from "shared/ui/Button";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function App() {
  const [count, setCount] = useState(0);
  const handle = useFullScreenHandle();
  return (
    <div className="app">
      <h1>Vite + React</h1>
      <Button onClick={() => setCount((count) => count + 1)}>{String(count)}</Button>
      <Button onClick={handle.enter}>fullscreen</Button>
      <FullScreen className="canvas" handle={handle}>
        Any fullscreen content here
      </FullScreen>
    </div>
  );
}
