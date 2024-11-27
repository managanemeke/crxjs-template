import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), svgr(), crx({ manifest })],
})
