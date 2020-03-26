const WebSocket = require("ws");

module.exports = {
  initWs(props = {}) {
    const { port = 3000, api = "/sockjs-node1" } = props;
    const ws = new WebSocket(`ws://localhost:${port}${api}`);
    ws.on("open", function open() {
      console.log("abc");
      // ws.send("something");
    });

    ws.on("message", function incoming(data) {
      console.log(data);
    });
    // const wss = new WebSocket.Server({ server });
    // wss.on("connection", ws => {
    //   ws.on("message", msg => {
    //     console.log(`Received message => ${msg}`);
    //     ws.send("received");
    //   });
    //   ws.send("ho!");
    // });
  }
};
