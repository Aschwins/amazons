const express = require('express')
const Datastore = require('nedb');
const app = express()
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const db = new Datastore('database.db')

app.use(express.static('public'));

// Save data
app.post('/api/logs', (request, response) => {
  console.log(request);
  console.log(request.body);
  const data = request.body;
  data['timestamp'] = Date.now();
  db.insert(data);
  response.json(data);
});

// Serve data
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