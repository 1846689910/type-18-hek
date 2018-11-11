const urlParser = require("url");
const http = require("http");
const https = require("https");
class Client{
    constructor(url){
        this._parsedUrl = urlParser.parse(url);
        this._utility = this._parsedUrl.protocol.startsWith("https:") ? https : http;
        this.request = this.request.bind(this);
    }
    /**
     * method: "GET", "POST",
     * headers: {"Content-Type", "application/json"},
     * body: JSON.stringify({abc: 123})
     */
    request(method, headers, body){
        return new Promise((resolve, reject) => {
            const {hostname, port, pathname: path} = this._parsedUrl;
            const request = this._utility.request({
                hostname, port, path, method, headers
            }, res => {
                console.log(`status: ${res.statusCode}`);
                console.log(`headers: ${JSON.stringify(res.headers)}`);
                const data = [];
                res.on("data", chunk => data.push(chunk))
                .on("end", () => resolve({res, body: Buffer.concat(data).toString()}));
            });
            request.on("error", err => reject(err));
            if(body) request.write(body);
            request.end();
        });
    }
}
new Client("https://jsonmock.hackerrank.com/api/movies/search/?Title=spiderman")
    .request("GET").then(res => console.log(JSON.parse(res.body)), err => console.log(err));

new Client("http://localhost:3000/upload").request("POST", {
    "Content-Type": "application/json"
}, JSON.stringify({abc: 123})).then(res => console.log(res.body), err => console.log(err));