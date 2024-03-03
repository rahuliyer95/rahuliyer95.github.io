import * as path from "path";

/** @type {import('vite').UserConfig} */
export default {
  publicDir: path.join(__dirname, "src", "static"),
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules", "bootstrap"),
      "~@fortawesome": path.resolve(__dirname, "node_modules", "@fortawesome"),
    },
  },
  root: path.join(__dirname, "src"),
};
