require("core-js/stable");
require("regenerator-runtime/runtime");
require("ignore-styles");
// const Window = require("window");
const { plugins: babelRcPlugins } = require("../../.babelrc");

// const window = new Window();
// global.window = window;
// global.document = window.document;
// global.navigator = window.navigator;
// global.L = require("leaflet");

const servers = ["express", "koa", "hapi"];
const server = servers.find(x => x === process.argv[2]) || servers[0];

require("@babel/register")({
  root: `./${server}`,
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [...babelRcPlugins, "@babel/plugin-proposal-class-properties"]
});

require(`./${server}`);
