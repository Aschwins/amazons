const EventEmitter = require('events');

class Player {
    constructor(ws) {
        this.id = Player.NextId();
        this.ws = ws;

        // If connected
        ws.on('message', msg => this.receive(msg));
        
        ws.on('close', function(ws) {
            delete MatchMaker.clients[MatchMaker.i];
        })
    }

    send(msg) {
        if (msg == 'white' || msg == 'black') {
            this.color = msg;
        }
        this.ws.send(msg);
    }

    receive(msg) {
        let obj = JSON.parse(msg);
        if (obj.type == 'move') {
            this.match.playMove(this.color, obj.data);
        }
        else if (obj.type == 'finish') {
            this.match.finish();
            this.matchMaker.finish(this.match);
        }
        else if (obj.type == 'identify') {
            //Get id of the player & send it back to the client
        }
    }
}

Player.Nr = 1;
Player.NextId = function() {
    return Player.Nr++;
}

module.exports = Player;