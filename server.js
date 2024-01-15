// server.js
const express = require("express")
// import bodyParser from 'body-parser';
// import  handleFaucet from './controller/FaucetController';
const authRoute = require('./controller/FaucetController')

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/api/auth", authRoute)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
