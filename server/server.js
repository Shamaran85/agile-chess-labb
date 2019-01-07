const app = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 1337;

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('move', (move) => {
        io.emit('move', move)
    })
})

http.listen(port, function () {
    console.log('Hello 1337');
})