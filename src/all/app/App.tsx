import "./App.css";
import { useState } from "react";
import { Button } from "shared/ui/Button";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>{String(count)}</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}
