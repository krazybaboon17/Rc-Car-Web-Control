const express = require("express");
const WebSocket = require("ws");

const app = express();
app.use(express.static("public"));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

const wss = new WebSocket.Server({ server });

let esp = null;

wss.on("connection", ws => {
  ws.on("message", msg => {
    msg = msg.toString();

    if (msg === "ESP") {
      esp = ws;
      console.log("ESP connected");
      return;
    }

    if (esp) esp.send(msg);
  });

  ws.on("close", () => {
    if (ws === esp) esp = null;
  });
});
