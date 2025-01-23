import { Button } from "antd";
import { useRef } from "react";

export default function App() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="app">
      <h1>Test</h1>
      <Button>
        toggle
      </Button>
    </div>
  );
}
