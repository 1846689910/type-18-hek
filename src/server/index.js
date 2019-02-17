const { APP_SERVER } = process.env;
require("@babel/register")({
    ignore: [/node_modules/],
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "@babel/plugin-syntax-dynamic-import",
        "transform-class-properties",
        ["react-css-modules", {
            webpackHotModuleReloading: true,
            generateScopedName: `${APP_SERVER.endsWith("dev") ? "[name]__[local]___" : ""}[hash:base64:5]`
        }],
        "@babel/plugin-proposal-class-properties"
    ]
});
require("@babel/polyfill");
if (APP_SERVER.startsWith("express")) {
    require("./express/server");
}
