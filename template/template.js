module.exports = {
    getHtml(title, reactDom, store){
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>${title}</title>
                <link rel="stylesheet" href="/main.bundle.css"/>
            </head>
            <body>
                <div id="root">${reactDom}</div>
                <script>window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}</script>
                <script type="text/javascript" src="/main.bundle.js"></script>
                <noscript>You need to enable JavaScript to run this app.</noscript>
            </body>
            </html>
        `;
    }
}
