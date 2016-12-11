const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', () => {
    console.log('User connected via socket.io');
});

http.listen(PORT, () => {
    console.log('Express running on PORT ' + PORT);
});