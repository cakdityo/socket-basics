const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;
var clientInfo = {};

app.use(express.static('public'));

// Listening for connection from client
// Pass the individual connection instance to socket param
io.on('connection', (socket) => {

    socket.on('joinRoom', (req) => {
        clientInfo[socket.id] = req;
        
        // Joining individual socket to specific room
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            user: req.user, connected: true
        });
    });

    // Listening for message coming from client
    // When received, emit the message to all connected clients
    socket.on('message', (text) => {
        io.to(clientInfo[socket.id].room).emit('message', {user: clientInfo[socket.id].user, text: text});
    });

    socket.on('disconnect', () => {
        if (clientInfo.hasOwnProperty(socket.id)) {
            socket.leave(clientInfo[socket.id].room);
            io.to(clientInfo[socket.id].room).emit('message', {
                user: clientInfo[socket.id].user,
                connected: false
            });
            delete clientInfo[socket.id];
        }
    });
});

http.listen(PORT, () => {
    console.log('Express running on PORT ' + PORT);
});