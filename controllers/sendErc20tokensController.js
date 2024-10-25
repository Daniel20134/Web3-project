import { ethers } from "ethers";
import testnetJSONRPC from "../rpc.js";
import { tokenABI } from "../erc20TokenABI.js";
import { convertToTokenUnits } from "../helpers/converters.js";

const INSPIRATION_TOKEN_ADDRESS = "0xb943f76d0ABe6852FA34e7238F2b47Afbd610ca7"; // a random testnet token address on Polygon zkEVM

export const sendERC20Token = async (req, res) => {
  try {
    const { address, erc20contractAddress, amount, privateKey } = req.body;

    // Initialize provider and wallet instance
    const provider = new ethers.JsonRpcProvider(testnetJSONRPC.polygonZkEVM);
    const walletInstance = new ethers.Wallet(privateKey, provider);

    // Initialize the token contract
    const tokenContract = new ethers.Contract(
      erc20contractAddress,
      tokenABI,
      walletInstance
    );

    // Fetch the decimals and convert the amount
    const tokenDecimals = await tokenContract.decimals();
    const convertedAmount = convertToTokenUnits(amount, tokenDecimals);

    // Send the transaction
    const tx = await tokenContract.transfer(address, convertedAmount);

    // Return the transaction details
    res.status(200).json({
      success: true,
      txHash: tx.hash,
      message: "Transaction sent successfully",
    });
  } catch (error) {
    // Error handling
    console.error("Error sending ERC-20 token:", error);
    res.status(500).json({
      success: false,
      message: "Error sending token",
      error: error.message,
    });
  }
};
