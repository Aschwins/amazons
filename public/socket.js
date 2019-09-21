var playerId = -1;
var ws = new WebSocket('ws://localhost:40510/');

ws.onmessage = function(e) {
    if (playerId == -1) {
        console.log(`Received user name ${e.data}`);
        playerId = e.data;
    }

    console.log(e.data);
};