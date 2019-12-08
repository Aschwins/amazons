var playerId = -1;
var color = 'None';
var ws = new WebSocket('ws://localhost:8080/');

ws.onmessage = function(e) {
    if (playerId == -1) {
        console.log(`Received user name ${e.data}`);
        playerId = e.data;
    }
    else {
        if (color == 'None'){
            console.log(`You are player ${e.data}`);
            color = e.data;
        }
        else {
            let move = new CustomEvent('move', { "detail": { data: e.data } });
            window.dispatchEvent(move);
        }
    }
};

