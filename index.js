const express = require('express')
const Datastore = require('nedb');
const Player = require('./player')
const Match = require('./match');
const app = express()
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const db = new Datastore('database.db')

app.use(express.static('public'));
app.use(express.json({
  limit: '1mb'
}));

db.loadDatabase();

// Serve data
var WebSocketServer = require('ws').Server;
var clients = {};
wss = new WebSocketServer({port: 40510});

i = 1;
waitingPlayers = [];
opposingPlayer = {};
wss.on('connection', function (ws) {
	// Upon first connection
	player = new Player(i);
	player.ws = ws;
	clients[i] = player;
	player.send(`${i}`);

	if (waitingPlayers.length != 0) {
		waitingPlayer = waitingPlayers.pop();
		opposingPlayer[i] = waitingPlayer;
		opposingPlayer[waitingPlayer] = i;
		new Match(clients[waitingPlayer], clients[i]).start();
	}
	else {
		waitingPlayers.push(i);
	}
	i++;

	// If connected
	ws.on('message', function (message) {
		obj = JSON.parse(message);
		if (obj.type == 'move') {
			oppId = opposingPlayer[obj.playerId];
			console.log(`sending message to player ${obj.playerId}: ${obj.data}`)
			clients[oppId].send(JSON.stringify({ data: obj.data }));
		}
		else if (obj.type == 'finish') {
			delete opposingPlayer[obj.playerId];
			waitingPlayers.push(obj.playerId);
		}
	})
	
	ws.on('close', function(ws) {
		delete clients[i];
	})
})