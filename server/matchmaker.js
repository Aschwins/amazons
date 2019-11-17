const Player = require('./player')
const Match = require('./match');

class MatchMaker {
    constructor(wss) {
        this.i = 1;
        this.waitingPlayers = [];
        this.opposingPlayer = {};
        this.clients = {};
        this.wss = wss;
        console.log(this.waitingPlayers.length);
    }

    start() {
        this.wss.on('connection', function (ws) {
            // Upon first connection
            var player = new Player(this.i);
            player.ws = ws;
            this.clients[this.i] = player;
            player.send(`${this.i}`);
            console.log(this.waitingPlayers);
            console.log(this.clients);
        
            if (this.waitingPlayers.length != 0) {
                console.log('HALLO!!!')
                waitingPlayer = this.waitingPlayers.pop();
                this.opposingPlayer[this.i] = waitingPlayer;
                this.opposingPlayer[waitingPlayer] = this.i;
                new Match(this.clients[waitingPlayer], this.clients[this.i]).start();
            }
            else {
                this.waitingPlayers.push(this.i);
            }
            this.i++;
        
            // If connected
            ws.on('message', function (message) {
                obj = JSON.parse(message);
                if (obj.type == 'move') {
                    oppId = this.opposingPlayer[obj.playerId];
                    console.log(`sending message to player ${obj.playerId}: ${obj.data}`)
                    this.clients[oppId].send(JSON.stringify({ data: obj.data }));
                }
                else if (obj.type == 'finish') {
                    delete this.opposingPlayer[obj.playerId];
                    this.waitingPlayers.push(obj.playerId);
                }
            })
            
            ws.on('close', function(ws) {
                delete this.clients[this.i];
            })
        });
    };
}    

module.exports = MatchMaker;