module.exports = (reactDom, initState) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Type-18-ssr</title>
    <link rel="stylesheet" href="./main.bundle.css"/>
</head>
<body>
    <div id="root">${ reactDom }</div>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(initState)}</script>
    <script src="./main.bundle.js"></script>
    <noscript>You need to enable JavaScript to run this app.</noscript>
</body>
</html>
`;
