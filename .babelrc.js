module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        "@babel/plugin-syntax-dynamic-import",
        "transform-class-properties",
        "css-modules-transform",
        ["react-css-modules", {
            webpackHotModuleReloading: true,
            generateScopedName: `[name]__[local]___[hash:base64:5]`
        }]
    ]
}
