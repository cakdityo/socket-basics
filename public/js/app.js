var socket = io();

// Listening for connection from server
socket.on('connect', () => {
    alert('Browser connected to socket.io server!');
});

// Listening for message coming from other client in real - time;
socket.on('message', (message) => {
    console.log(message.user + ' said: ' + message.text);
});

function qs(query) {
    return document.querySelector(query);
}

var randomUser = Math.floor((Math.random() * 100) + 1);

function handleChatSubmit(e){
    e.preventDefault();
    var message = qs('textarea[name="textMessage"]');
    socket.emit('message', {user: randomUser, text: message.value});
    message.value = '';
}

qs('#chatForm').addEventListener('submit', handleChatSubmit);