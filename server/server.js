const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let users = [];

io.on("connection", function(socket) {
  socket.on("login", function(name) {
    users.push(name);
    socket.broadcast.emit("login", name);
    console.log(`user ${name} connected!, total users : ${users.length}`);
  });

  socket.on("chat-message", function(msg) {
    socket.broadcast.emit("chat-message", msg);
  });

  socket.on("is-typing", function(name) {
    socket.broadcast.emit("is-typing", name);
  });

  socket.on("clear-typing", function(name) {
    socket.broadcast.emit("clear-typing", name);
  });

  socket.on("users-online", function() {
    socket.emit("users-online", users);
  });

  socket.on("user-disconnecting", function(name) {
    socket.emit("disconnect", name);
    users = users.filter(user => user !== name);
    socket.emit("users-online", users);
    console.log(`user ${name} disconnected, ${users}`);
  });

  socket.on("disconnect", function() {
    null;
  });
});

http.listen(3004, function() {
  console.log("listening server on 3004 port");
});

// socket.on("connection", function() {
//   console.log("user connected");
// });

// socket.on("typing", function(name) {
//   socket.broadcast.emit("typing", name);
//   console.log("name:", name);
// });

// socket.on("chat-message", function(msg) {
//   socket.broadcast.emit("chat-message", msg);
//   console.log("message: " + JSON.stringify(msg));
// });

// socket.on("disconnect", function() {
//   console.log("user disconected D:");
// });
