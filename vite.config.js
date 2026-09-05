import * as path from "path";

const __dirname = import.meta.dirname;

/** @type {import('vite').UserConfig} */
export default {
  publicDir: path.join(__dirname, "src", "static"),
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules", "bootstrap"),
    },
  },
  root: path.join(__dirname, "src"),
};
