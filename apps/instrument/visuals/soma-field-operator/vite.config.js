import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

// Two pages: the Soma Machine and the overview of how its screens fit together (ISS-100).
export default defineConfig({
  build: {
    outDir: "../../../../bld/app",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        overview: fileURLToPath(new URL("./overview.html", import.meta.url)),
      },
    },
  },
});