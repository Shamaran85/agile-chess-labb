const app = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 1337;

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('room', payload => {
        const { id } = payload;
        socket.join(+id);
    })
    socket.on('move', (move) => {
        console.log("move", +move.roomId);
        io.to((+move.roomId)).emit('move', move)
    })
})

http.listen(port, function () {
    console.log('Hello 1337');
})