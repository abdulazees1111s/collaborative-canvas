const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuid } = require("uuid");
const { RoomManager } = require("./rooms");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("client"));

const rooms = new RoomManager();
const room = rooms.getRoom("default");

io.on("connection", (socket) => {
  const userId = uuid();
  room.addUser(userId);
  socket.join(room.id);

  socket.emit("init", {
    userId,
    users: room.users,
    operations: room.state.operations
  });

  socket.on("stroke:commit", (stroke) => {
    room.commitStroke(stroke);
    socket.to(room.id).emit("stroke:commit", stroke);
  });

  socket.on("undo", () => {
    room.state.undo();
    io.to(room.id).emit("canvas:sync", room.state.operations);
  });

  socket.on("redo", () => {
    room.state.redo();
    io.to(room.id).emit("canvas:sync", room.state.operations);
  });

  socket.on("disconnect", () => {
    room.removeUser(userId);
  });
});

server.listen(3000, () => {
  console.log("? Server running at http://localhost:3000");
});
