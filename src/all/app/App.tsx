import "./App.css";
import { Button } from "antd";
import { useRef } from "react";
import { useFullscreen } from "ahooks";

export default function App() {
  const ref = useRef<HTMLDivElement>(null);

  const [, {toggleFullscreen}] = useFullscreen(ref);

  return (
    <div
      ref={ref}
      className="app"
    >
      <h1>
        Test
      </h1>
      <Button
        onClick={toggleFullscreen}
      >
        toggle
      </Button>
    </div>
  );
}
