import "./App.css";
import { useEffect, useRef } from "react";

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log(ref.current);
    console.log(buttonRef.current);
    if (buttonRef.current?.children) {
      console.log(buttonRef.current.children);
    }
  }, []);

  return (
    <div ref={ref} className="app">
      <h1>Vite + React</h1>
      <button>
        toggle
      </button>
    </div>
  );
}
