const Player = require('./player')
const Match = require('./match');

class MatchMaker {
    constructor(wss) {
        // Serve data
        this.wss = wss
    }
    
    start() {
        this.wss.on('connection', function (ws) {
            // Upon first connection
            console.log(MatchMaker.i);
            let player = new Player(MatchMaker.i, ws);
            MatchMaker.clients[MatchMaker.i] = player;
            player.send(`${MatchMaker.i}`);
            player.Event.on('finish', function() {
                MatchMaker.waitingPlayers.push(obj.playerId);
            })
        
            if (MatchMaker.waitingPlayers.length > 0) {
                let waitingPlayer = MatchMaker.waitingPlayers.pop();
                new Match(MatchMaker.clients[waitingPlayer], MatchMaker.clients[MatchMaker.i]).start();
            }
            else {
                MatchMaker.waitingPlayers.push(MatchMaker.i);
            }
            MatchMaker.i++;
        
        });
    }    
}    

MatchMaker.i = 1;
MatchMaker.waitingPlayers = [];
MatchMaker.clients = {};


module.exports = MatchMaker;