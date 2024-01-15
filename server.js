const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { routers } = require('./routes/faucet')

const port = 3000;

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://Vanduc711:vanduc711@cluster0.682ao.mongodb.net/")
  .then(() => console.info('MongoDB connected'))
  .catch(console.error)

routers(app)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
