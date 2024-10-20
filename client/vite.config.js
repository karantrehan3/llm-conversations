import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "rt-client": path.resolve(__dirname, "../server/src"),
    },
  },
});
