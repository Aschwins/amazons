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
            let player = new Player(MatchMaker.i);
            player.ws = ws;
            MatchMaker.clients[MatchMaker.i] = player;
            player.send(`${MatchMaker.i}`);
        
            if (MatchMaker.waitingPlayers.length != 0) {
                let waitingPlayer = MatchMaker.waitingPlayers.pop();
                MatchMaker.opposingPlayer[MatchMaker.i] = waitingPlayer;
                MatchMaker.opposingPlayer[waitingPlayer] = MatchMaker.i;
                new Match(MatchMaker.clients[waitingPlayer], MatchMaker.clients[MatchMaker.i]).start();
            }
            else {
                MatchMaker.waitingPlayers.push(MatchMaker.i);
            }
            MatchMaker.i++;
        
            // If connected
            ws.on('message', function (message) {
                let obj = JSON.parse(message);
                if (obj.type == 'move') {
                    let oppId = MatchMaker.opposingPlayer[obj.playerId];
                    console.log(`sending message to player ${obj.playerId}: ${obj.data}`)
                    MatchMaker.clients[oppId].send(JSON.stringify({ data: obj.data }));
                }
                else if (obj.type == 'finish') {
                    delete MatchMaker.opposingPlayer[obj.playerId];
                    MatchMaker.waitingPlayers.push(obj.playerId);
                }
            })
            
            ws.on('close', function(ws) {
                delete MatchMaker.clients[MatchMaker.i];
            })
        });
    }    
}    

MatchMaker.i = 1;
MatchMaker.waitingPlayers = [];
MatchMaker.opposingPlayer = [];
MatchMaker.clients = {};


module.exports = MatchMaker;