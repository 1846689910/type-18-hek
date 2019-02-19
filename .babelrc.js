const { APP_SERVER } = process.env;
module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "@babel/plugin-syntax-dynamic-import",
        "transform-class-properties",
        "css-modules-transform",
        ["react-css-modules", {
            webpackHotModuleReloading: true,
            generateScopedName: `${APP_SERVER && APP_SERVER.endsWith("dev") ? "[name]__[local]___" : ""}[hash:base64:5]`
        }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
        "@babel/proposal-object-rest-spread"
    ]
}
