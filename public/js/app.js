var socket = io();

socket.on('connect', () => {
    alert('Browser connected to socket.io server!');
});