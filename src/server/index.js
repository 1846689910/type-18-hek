const { startSetup } = require("./utils/commands");
startSetup();
const { APP_SERVER, APP_SERVER_MODE } = process.env;
require("@babel/register")({
  ignore: [/node_modules/],
  presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-syntax-dynamic-import",
    "transform-class-properties",
    "css-modules-transform",
    [
      "react-css-modules",
      {
        webpackHotModuleReloading: true,
        generateScopedName: `${
          APP_SERVER_MODE === "dev" ? "[name]__[local]___" : ""
        }[hash:base64:5]`
      }
    ],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "@babel/proposal-object-rest-spread"
  ],
  extensions: [".js", ".jsx", ".ts", ".tsx"]
});
require("@babel/polyfill");
if (APP_SERVER === "express") {
  require("./express/server");
} else {
  require("./express/server");
}
