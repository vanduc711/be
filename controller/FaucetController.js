const { contract, web3 } = require('../config/contract')
const { Faucet } = require('../model/index')

const getLastFaucetTime = async (userAddress) => {
  try {
    const lastLog = await Faucet.findOne({ userAddress }).sort({ timestamp: -1 });

    const timestamp = lastLog ? lastLog.timestamp : null;
    return timestamp;
  } catch (error) {
    console.error('Error getting last faucet time:', error);
    return null;
  }
};

const updateLastFaucetTime = async (userAddress, transactionHash) => {
  try {
    if (transactionHash) {
      const existingLog = await Faucet.findOne({ userAddress });

      if (existingLog) {
        existingLog.transactionHash = transactionHash;
        existingLog.timestamp = Date.now();
        await existingLog.save();
      } else {
        const newFaucetLog = new Faucet({ userAddress, transactionHash });
        await newFaucetLog.save();
      }
    }
  } catch (error) {
    console.error('Error updating last faucet time:', error);
  }
};

const isTimeDifferenceEnough = (lastFaucetTime) => {

  const currentTime = Date.now();
  const timeDifference = currentTime - lastFaucetTime;
  const requiredTimeDifference = 120000;
  return timeDifference >= requiredTimeDifference || timeDifference < 0;
};

const handleFaucet = async (req, res) => {
  const userAddress = req.body.address;

  try {
    const hasFaucetedBefore = await hasUserFaucetBefore(userAddress);

    if (!hasFaucetedBefore) {
      
      const result = await faucet(userAddress);
      await saveFaucetLog(userAddress, result.transactionHash);
      return res.status(200).json(result.transactionHash);
    } else {

      const lastFaucetTime = await getLastFaucetTime(userAddress);
      console.log(isTimeDifferenceEnough(lastFaucetTime))

      if (isTimeDifferenceEnough(lastFaucetTime)) {
        console.log('Enough time has passed since the last faucet. Proceeding with faucet.');
        
        const result = await faucet(userAddress);
        await updateLastFaucetTime(userAddress, result.transactionHash);
          return res.status(200).json(result.transactionHash);
      } else {
        console.log('Not enough time has passed since the last faucet. Aborting.');
        return res.status(400).json('Not enough time has passed since the last faucet.');
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json('Internal Server Error' );
  }
};

const faucet = async (userAddress) => {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    const account = web3.eth.accounts.privateKeyToAccount("0x28f7d1908d2588ce1a697a0979ccc89ca0054388eda4109da0282eb69700bd2f");
    web3.eth.accounts.wallet.add(account);
    const result = await contract.methods.receiveTokenERC20(userAddress).send({ from: account.address, gasPrice });

    return { success: true, transactionHash: result.transactionHash };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Internal Server Error' };
  }
};

const hasUserFaucetBefore = async (userAddress) => {
  try {
    const faucetCount = await Faucet.countDocuments({ userAddress });
    return faucetCount > 0;
  } catch (error) {
    console.error('Error checking if user has fauceted before:', error);
    return false;
  }
};

const saveFaucetLog = async (userAddress, transactionHash) => {
  try {
    const faucetLog = new Faucet({
      userAddress: userAddress,
      transactionHash: transactionHash,
    });

    await faucetLog.save();
    console.log('Faucet log saved successfully.');
  } catch (error) {
    console.error('Error saving faucet log:', error);
  }
}

module.exports = { handleFaucet, saveFaucetLog };
