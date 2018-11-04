const http = require("http");
const urlParser = require("url");
const url = "http://localhost:3000/dog/food";
const {hostname, port, pathname: path} = urlParser.parse(url);
console.log(urlParser.parse(url))
const request = http.request({
    hostname, port, path,
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}, res =>{
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    const data = [];
    res.on('data', chunk => data.push(chunk));
    res.on('end', () => console.log(Buffer.concat(data).toString()));
}).on("error", err => console.log(err));
request.write(JSON.stringify({abc: 123}));
request.end();







// https.request({
//     hostname: "www.google.com",
//     port: 80,
//     path: "/",
//     method: "GET"
// }, res => console.log(res));


// https.get(s, res => {
//     const data = [];
//     // A chunk of data has been received.
//     res.on('data', (chunk) => {
//         data.push(chunk);
//     });
//     // The whole response has been received. Print out the result.
//     res.on('end', () => {
//         console.log(Buffer.concat(data).toString());
//     });
// }).on("error", err => {
//     console.log(err.message);
// });

// https.request({
//     hostname: "i9.ytimg.com",
//     path: "/sb/T4SimnaiktU/storyboard3_L1/M0.jpg?sqp=ovOX_wMGCLTtlMMF&sigh=rs%24AOn4CLDF_M2qTJg0nNUc1Fs-Wjeki0I46w",
//     method: "GET"
// }, res => console.log(res));


