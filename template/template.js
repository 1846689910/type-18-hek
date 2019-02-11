const fs = require("fs");
const path = require("path");
const Promise = require("bluebird");
const readFile = Promise.promisify(fs.readFile);

module.exports = {
    getTemplate(staticPath, reactDom, store){
        return readFile(path.join(staticPath, "main.html"), {encoding: "utf-8"}).then(template => template
            .replace("<!--__PRELOADED_STATE__-->", `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}</script>`)
            .replace("<!--__REACT_DOM__-->", reactDom));
    }
}
