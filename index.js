const express = require('express')
const app = express()
const port = 3000

//app.get('/', (req, res) => res.sendFile('public/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(express.static('public'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/api', function (req, res) {
    res.send('hello world')
  })