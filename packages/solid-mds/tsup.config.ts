import { defineConfig } from "tsup";
import solidPlugin from "esbuild-plugin-solid";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm"],
  target: "esnext",
  clean: true,
  dts: true,
  sourcemap: "inline",
  // Output preserved JSX as .jsx for the solid condition
  esbuildOptions(options) {
    options.jsx = "preserve";
    options.jsxImportSource = "solid-js";
    options.sourcemap = "inline";
  },
  outExtension: () => ({ js: ".jsx" }),
});
