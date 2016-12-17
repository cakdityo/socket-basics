(function(){

    var socket = io();

    var name = h.getQueryParam('name') || 'anonymous',
        room = h.getQueryParam('room');

    h.qs('.room-name').innerHTML = room;

    // Listening for connection from server
    socket.on('connect', () => {
        socket.emit('joinRoom', {
            user: name,
            room: room
        });
    });

    // Listening for message coming from other client pushed from server in real - time;
    socket.on('message', (message) => {
        var chats = h.qs('#chat-list ul');

        if (!message.hasOwnProperty('text')) {
            chats.innerHTML += `<li><small>${ message.user } joined chat</small></li>`;
        } else {
            chats.innerHTML += `<li>${message.user} : "${message.text}"</li>`;
        }

    });

    function handleChatSubmit(e){
        e.preventDefault();
        var message = h.qs('textarea[name="textMessage"]');
        if (message.value.length > 0) {
            socket.emit('message', {user: name, text: message.value});
        }
        message.value = '';
    }

    h.qs('#chat-form').addEventListener('submit', handleChatSubmit);

    window.socket = socket;

})();