import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: Number(process.env.PORT) || 8080,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 8080,
    strictPort: true,
  },
});
