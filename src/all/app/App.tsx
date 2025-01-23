import "./App.css";
import { useEffect, useRef } from "react";

export default function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(ref.current);
  }, []);

  return (
    <div ref={ref} className="app">
      <h1>Vite + React</h1>
    </div>
  );
}
