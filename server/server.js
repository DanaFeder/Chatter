const express = require("express");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");
const { get_Current_User, user_Disconnect, join_User } = require("./dummyuser");

app.use(express());

const port = 8000;

app.use(cors());

var server = app.listen(
  port
);

const io = socket(server);

//initializing the socket io connection 
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, roomname, pic }) => {
    const p_user = join_User(socket.id, username, roomname, pic);
    socket.join(p_user.room);

    socket.emit("message", {
      userId: p_user.id,
      username: p_user.username,
      date: new Date(),
      text: `Welcome ${p_user.username}`,
      pic: p_user.pic
    });

    socket.broadcast.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      date: new Date(),
      text: `${p_user.username} has joined the chat`,
      pic: p_user.pic
    });
  });

  //user sending message
  socket.on("chat", (text) => {
    const p_user = get_Current_User(socket.id);

    io.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      date: new Date(),
      text: text,
      pic: p_user.pic
    });
  });

  //user exits the room
  socket.on("disconnect", () => {
    const p_user = user_Disconnect(socket.id);

    if (p_user) {
      io.to(p_user.room).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        date: new Date(),
        text: `${p_user.username} has left the chat`,
        pic: p_user.pic
      });
    }
  });
});