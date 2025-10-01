import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  build: {
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }

          if (
            id.includes("src/api/") ||
            id.includes("src/assets/") ||
            id.includes("src/lib/") ||
            id.includes("src/pages/common/")
          ) {
            return "common";
          }

          const orderPages = [
            "src/pages/TableValidationPage/TableValidationPage",
            "src/pages/OrderMenu/OrderMenu",
            "src/pages/OrderMenuDetail/OrderMenuDetail",
            "src/pages/OrderCart/OrderCart",
            "src/pages/OrderStatus/OrderStatus",
          ];

          if (orderPages.some((pagePath) => id.includes(pagePath))) {
            return "store-order";
          }
        },
      },
    },
  },
  plugins: [react(), visualizer({ open: true })],
  resolve: {
    alias: [
      {
        find: "#",
        replacement: "/src",
      },
    ],
  },
});
