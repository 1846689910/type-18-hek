const request = require("request");
request({
   method: "POST",
   url: "http://localhost:3000/dog/food",
   headers: {
       "Content-Type": "application/json"
   },
   body: JSON.stringify({a: 123})
}, (err, response, body) => {
   console.log(body);
});
