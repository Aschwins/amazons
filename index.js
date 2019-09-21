const express = require('express')
const Datastore = require('nedb');
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
wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    obj = JSON.parse(message);
    for (var key in clients) {
      if (key != obj.playerId) {
        console.log(`sending message to player ${obj.playerId}: ${obj.data}`)
        clients[key].send(JSON.stringify({ data: obj.data }));
      }
    }
  })
  
  ws.on('close', function(ws) {
    delete clients[i];
  })

  clients[i] = ws;

  ws.send(`${i}`);

  i++;
})

// Save data
app.post('/api/logs', (request, response) => {
  console.log(request.body);
  const data = request.body;
  data['timestamp'] = Date.now();
  db.insert(data);
  ws.send(`ws: ${data}`)
  response.json(data);
});


app.get('/api/logs', (request, response) => {
  console.log("GET request: ");
  db.find({}, (err, data) => {
      if (err) {
          response.end();
          return;
      }
      response.json(data);
  });
})