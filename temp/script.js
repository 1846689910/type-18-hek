const http = require("http");
const fs = require("fs");
const server = http.createServer(function(req, res){
    if (req.method === "GET") {
        switch(req.url) {
            case "/":
                fs.readFile("./index.html", function(err, data){
                    if (err) throw err;
                    res.writeHeader(200, {"Content-Type" : "text/html"});
                    res.write(data.toString());
                    res.end();
                });
                break;
        }
    } else if (req.method === "POST") {
        let body = "";
        req.on('data', (data) => {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });
        new Promise(resolve => {
            req.on('end', () => {
                resolve(qs.parse(body));
            });
        }).then(result => {
            // use result['xxx']
        })
    }
});
server.listen(8080);
