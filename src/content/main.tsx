import {Logger} from "./Logger";
import App from "../all/app/App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

export class Main {
  constructor() {
    new Logger();
    this.placeApp();
  }

  placeApp() {
    const htmlElement = document.querySelector("html") as HTMLElement;
    createRoot(htmlElement!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}

new Main();
