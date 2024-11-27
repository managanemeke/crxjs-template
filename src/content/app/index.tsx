import "./index.css"
import { StrictMode } from "react";
import { default as App } from "./App";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
