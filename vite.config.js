import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // nombre EXACTO del repo en GitHub, con la barra final
  base: ".",
});
