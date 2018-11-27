const express = require("express");
const status = require("http-status");
const path = require("path");
const bodyParser = require("body-parser");
const dog = require("./dog");

const app = express();
app.use(express.static(path.join(path.dirname(__dirname), "test")));  // GET /mocha.test.js will fetch the file in static folder directly
app.use(bodyParser.urlencoded({extended: true}));  // check Content-Type and parse body
app.use(bodyParser.json());  // parse application/json
app.use(bodyParser.raw());  // check Content-Type and parse body as a buffer
app.use(bodyParser.text());  // parse text/plain

app.get("/", (req, res) => {  // app.get  .put  .post  .delete  .options
    console.log(req.body);
    res.status(status.OK).header("Access-Control-Allow-Origin", "*").send("this is start page");
});
app.get("/upload", (req, res) => {
    res.status(status.BAD_REQUEST).send("please use post");
});
app.post("/upload", (req, res) => {
    switch(req.get("Content-Type")){
        case "application/x-www-form-urlencoded":
            break;
        case "text/plain":
            break;
        case "application/json":
            break;
        default:
    }
    console.log(req.body);
    res.status(status.OK).send("this is upload page");
});
app.get("/test", (req, res) => {
    res.status(status.OK).json({hello: "I am test"})
});
app.get("/user/:id", (req, res) => {
    res.status(status.OK).send(req.params.id);
});
app.get("/delay", (req, res) => {
    setTimeout(() => res.header("Access-Control-Allow-Origin", "*").status(status.NOT_FOUND).send("this is a delay response"), 2000);
});
app.options("/*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
        .header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With")
        .status(status.OK)
        .send()
});
app.use("/dog", dog);  // then the GET /dog and POST /dog/food are handled by a separated router dog.js, which will make app modular
app.use((req, res) => {
    res.header("Access-Control-Allow-Origin", "*").status(status.NOT_FOUND).send();
});
app.listen(3000, () => {
    console.log("Express App Started");
});