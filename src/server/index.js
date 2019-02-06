require('@babel/register')({
    ignore: [/(node_modules)/],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        "@babel/plugin-syntax-dynamic-import",
        "transform-class-properties"
    ]
});
require("babel-polyfill");
require('./server');
