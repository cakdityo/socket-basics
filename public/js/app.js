(function(){

    var socket = io();

    var name = h.getQueryParam('name') || 'anonymous',
        room = h.getQueryParam('room');

    // Listening for connection from server
    socket.on('connect', () => {
        socket.emit('message', { user: name, room: room, newMember: true});
    });

    // Listening for message coming from other client pushed from server in real - time;
    socket.on('message', (message) => {
        if (message.room === room) {
            var chats = h.qs('#chat-list ul');
            if (message.hasOwnProperty('newMember') && message.user !== name) {
                chats.innerHTML += `<li><small>${ message.user } joined chat</small></li>`;
            }
            
            if (message.hasOwnProperty('text')){
                chats.innerHTML += `<li>${message.user} : "${message.text}"</li>`;
            }
        } 
    });

    function handleChatSubmit(e){
        e.preventDefault();
        var message = h.qs('textarea[name="textMessage"]');
        socket.emit('message', {user: name, room: room, text: message.value});
        message.value = '';
    }

    h.qs('#chat-form').addEventListener('submit', handleChatSubmit);

    window.socket = socket;

})();