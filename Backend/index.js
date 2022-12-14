const connectToMongo = require('./db')
require('dotenv').config()
const express = require('express')

connectToMongo();

const app = express()
const port = 5000;

app.use(express.json())

const cors = require('cors');
app.use(cors({ origin: true }));

app.use('/api/auth', require('./routes/auth'))
app.use('/api/book', require('./routes/Book'))
app.get('/', (req, res) => { res.send('Hello from Express!') })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})