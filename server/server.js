var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

const port = process.env.PORT || 1337;

io.on("connection", function(socket) {
  socket.on("message", function(msg) {
    console.log("got msg", msg);
    io.emit("message", msg);
  });
});

http.listen(port, () => console.log("Listening on PORT: " + port));
