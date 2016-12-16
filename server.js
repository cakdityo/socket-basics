const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Listening for connection from client
// Pass the individual connection instance to socket param
io.on('connection', (socket) => {

    // Listening for message coming from client
    // When received, emit the message to all connected clients
    socket.on('message', (message) => {
        io.emit('message', message);
    });
});

http.listen(PORT, () => {
    console.log('Express running on PORT ' + PORT);
});