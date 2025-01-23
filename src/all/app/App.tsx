import "./App.css";
import { Button } from "antd";
import { useRef } from "react";

export default function App() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="app">
      <h1>Vite + React</h1>
      <Button>
        toggle
      </Button>
    </div>
  );
}
