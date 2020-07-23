const express = require("express");
const server = require("http").Server(express);
const io = require("socket.io").listen(3000);

let Current_sockets = 0;

const users = {};

io.on("connection", (socket) => {
  Current_sockets++;

  console.log("socket connected :" + Current_sockets);

  socket.on("testCon", () => {
    console.log("test connection works");
  });
  //New user
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  //After form Submit
  socket.on("send-chat-msg", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });

  //DISCONNECT
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-dc", users[socket.id]);
    delete users[socket.id];
  });
});

console.log(`Server has started on port ${3000}`);
