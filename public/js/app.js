var socket = io();

// Listening for connection from server
socket.on('connect', () => {
    console.log('Browser connected to socket.io server!');
});

// Listening for message coming from other client in real - time;
socket.on('message', (message) => {
    var chats = qs('#chat-list ul');
    chats.innerHTML += `<li>${message.user} : "${message.text}"</li>`;
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

qs('#chat-form').addEventListener('submit', handleChatSubmit);