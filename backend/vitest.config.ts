import path from "node:path";
import { defineConfig } from "vitest/config";

const MODULES = ["products", "users", "auth"];

const modulesPathResolvers = MODULES.reduce(
  (acc, cur) => {
    acc[`@${cur}`] = path.resolve(__dirname, `./src/modules/${cur}`);
    return acc;
  },
  {} as Record<string, string>,
);

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/tests/**/*.spec.ts"],
  },
  resolve: {
    alias: {
      ...modulesPathResolvers,
      "@": path.resolve(__dirname, "./src"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@infra": path.resolve(__dirname, "./src/infra"),
      "@prisma-generated": path.resolve(
        __dirname,
        "./src/infra/prisma/generated",
      ),
    },
  },
});
