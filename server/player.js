const EventEmitter = require('events');

class Player {
    constructor(id, ws) {
        this.id = id;
        this.ws = ws;
        this.Event = new EventEmitter();

        // If connected
        ws.on('message', msg => this.receive(msg));
        
        ws.on('close', function(ws) {
            delete MatchMaker.clients[MatchMaker.i];
        })
    }

    send(msg) {
        this.ws.send(msg);
    }

    receive(msg) {
        let obj = JSON.parse(msg);
        this.Event.emit(obj.type, obj.data);
    }
}

module.exports = Player;