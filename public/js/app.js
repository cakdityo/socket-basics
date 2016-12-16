var socket = io();

// Listening for connection from server
socket.on('connect', () => {
    var name = h.getQueryParam('name'),
        room = h.getQueryParam('room');

    if (name.length > 1 && room.length > 1) {
        socket.emit('auth', { name: name, room: room });
    }
});

socket.on('auth', (auth) => {
    var loggedInUser = h.qs('#chat-list ul');
    loggedInUser.innerHTML += `<li><small>${ auth.name } joined chat</small></li>`;
});

// Listening for message coming from other client pushed from server in real - time;
socket.on('message', (message) => {
    var chats = h.qs('#chat-list ul');
    chats.innerHTML += `<li>${message.user} : "${message.text}"</li>`;
});

var randomUser = Math.floor((Math.random() * 100) + 1);

function handleChatSubmit(e){
    e.preventDefault();
    var message = h.qs('textarea[name="textMessage"]');
    socket.emit('message', {user: h.getQueryParam('name'), text: message.value});
    message.value = '';
}

h.qs('#chat-form').addEventListener('submit', handleChatSubmit);