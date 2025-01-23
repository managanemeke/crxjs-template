import {useEffect, useRef} from "react";

export default function App() {
  let ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref = useRef<HTMLDivElement>(null);
  }, []);

  return (
    <div ref={ref} className="app">
      <h1>Vite + React</h1>
    </div>
  );
}
