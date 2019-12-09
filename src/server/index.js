require("core-js/stable");
require("regenerator-runtime/runtime");
require("ignore-styles");

const servers = ["express", "koa", "hapi"];
const server = servers.find(x => x === process.argv[2]) || servers[0];

require("@babel/register")({
  root: `./${server}`,
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"]
});

require(`./${server}`);
