// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tsconfigPaths from "vite-tsconfig-paths";
// import * as path from "path"; 
// import { fileURLToPath } from "url";

// // __dirname workaround for ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default defineConfig({
//   plugins: [
//     react(),
//     tsconfigPaths({
//       projects: ["./tsconfig.json"],
//     }),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "dist", // Render serves from here
  },
  preview: {
    allowedHosts: ["web-ui-d5g8.onrender.com"], // ✅ allow your Render domain
    port: 4173, // optional but recommended for preview
  },
});
