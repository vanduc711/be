const router = require("express").Router()

router.post('/faucet', async (req, res) => {
  const userAddress = req.body.userAddress;
  try {
    // Kiểm tra tính hợp lệ của địa chỉ người dùng (có thể thêm kiểm tra bổ sung nếu cần)
    if (!isAddress(userAddress)) {
      return { success: false, error: 'Invalid user address' };
    }

    // Gọi chức năng faucet từ smart contract
    const gasPrice = await web3.eth.getGasPrice();
    const result = await contract.methods.receiveTokenERC20(userAddress).send({ from: adminAddress, gasPrice });

    // Lưu thông tin faucet vào MongoDB (hoặc nơi lưu trữ khác)
    await saveFaucetLog(userAddress, result.transactionHash);

    return { success: true, transactionHash: result.transactionHash };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Internal Server Error' };
  }
//   const result = await handleFaucet(userAddress);

//   if (result.success) {
//     res.json({ success: true, transactionHash: result.transactionHash });
//   } else {
//     res.status(400).json({ success: false, error: result.error });
//   }
});

module.exports = router