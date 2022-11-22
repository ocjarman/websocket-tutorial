const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

// Notice that I initialize a new instance of socket.io by passing the server
// (the HTTP server) object. Then I listen on the connection event for incoming
// sockets and log it to the console.
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// socket.broadcast.emit('hi');

server.listen(1337, () => {
  console.log("listening on *:1337");
});
