const Player = require('./player')
const Match = require('./match');

class MatchMaker {
    constructor(wss) {
        // Serve data
        this.wss = wss;
        this.matches = {
            new: {},
            started: {},
            finished: {}
        };
    }
    
    start() {
        this.wss.on('connection', ws => this.onConnect(ws));
    }

    onConnect(ws) {
        // Upon first connection
        let player = new Player(ws);
        console.log(`player connected: ${player.id}`);
        player.matchMaker = this;
        player.send(`${player.id}`);
        this.assignMatch(player);
    }

    assignMatch(player) {
        if (this.matches.new.length > 0) {
            let match = this.matches.new.first();
            delete this.matches.new[match.id]
            match.player2 = player;
            match.start();
            this.matches.started[match.id] = match;
        }
        else {
            let match = new Match(player);
            this.matches.new[match.id] = match;
        }
    }

    //Put match on archived pile, automatically start a new match
    finish(match) {
        delete this.matches.started[match.id];
        this.matches.finished[match.id] = match;
        this.assignMatch(match.player1);
        this.assignMatch(match.player2);
    }
}

module.exports = MatchMaker;