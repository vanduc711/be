const { handleFaucet, saveFaucetLog } = require("../controller/FaucetController")


const routers = (app) => {
  app.get('/', (_req, res) => res.status(200).json('Finentic centralized server is running.'))
  app.post('/faucet', handleFaucet)
}

module.exports = {
  routers
}