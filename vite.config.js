import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import manifest from "./manifest.json";
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    crx({ manifest }),
  ],
  resolve: {
    alias: {
      "app": "/src/all/app",
      "shared": "/src/all/shared",
    },
  },
})
