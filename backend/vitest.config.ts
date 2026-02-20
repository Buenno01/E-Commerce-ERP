import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/tests/**/*.spec.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@products": path.resolve(__dirname, "./src/modules/products"),
      "@infra": path.resolve(__dirname, "./src/infra"),
      "@prisma-generated": path.resolve(
        __dirname,
        "./src/infra/prisma/generated",
      ),
    },
  },
});
