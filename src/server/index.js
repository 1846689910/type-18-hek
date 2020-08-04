require("core-js/stable");
require("regenerator-runtime/runtime");
require("ignore-styles");
const { plugins: babelRcPlugins } = require("../../.babelrc");

const servers = ["express", "koa", "hapi"];
const server = servers.find(x => x === process.argv[2]) || servers[0];

require("@babel/register")({
  root: `./${server}`,
  ignore: [/(node_modules)/],
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [...babelRcPlugins, "@babel/plugin-proposal-class-properties"],
  extensions: [".es6", ".es", ".jsx", ".js", ".mjs", ".ts", ".tsx"],
});

require(`./${server}`);
