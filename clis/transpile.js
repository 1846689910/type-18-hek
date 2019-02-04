#!/usr/bin/env node
function _getTargetName(src) {
    var path = require("path");
    var dir = path.dirname(path.resolve(src));
    var nameparts = path.basename(src).split(".");
    nameparts.splice(nameparts.length - 1, 0, "transpiled")
    return path.join(dir, nameparts.join("."));
}
function _write(src, target) {
    var babel = require("@babel/core");
    var fs = require("fs");
    var obj = babel.transformFileSync(src);
    fs.writeFileSync(target, obj.code);
}
function transpile() {
    var args = process.argv.slice(2);
    if (args.length === 0) {
        throw new Error("Please use `transpile <SRC.js> <TARGET.js>` or `transpile <SRC.js>`");
    } else {
        var target = args.length === 1 ? _getTargetName(args[0]) : args[1];
        _write(args[0], target);
        console.log(args[0] + " has been transpiled at " + target);
    }
}
transpile();
