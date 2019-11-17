// Deze class is alleen bedoelt om klasses aan te maken die het werk doen en configuratie bij te houden

const express = require('express')
const Datastore = require('nedb');
const MatchMaker = require('./matchmaker');
const app = express()
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//const db = new Datastore('database.db')

app.use(express.static('../public'));
app.use(express.json({
  limit: '1mb'
}));


// Serve data
var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 40510});

var matchMaker = new MatchMaker(wss);

matchMaker.start();

// db.loadDatabase();
// Allerlei shit om met de database om te gaan.