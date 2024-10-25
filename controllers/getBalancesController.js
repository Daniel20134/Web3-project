import { ethers} from "ethers"
import { tokenABI } from "../erc20TokenABI.js";
import testnetJSONRPC from "../rpc.js"
import { convertFromTokenUnits } from "../helpers/converters.js";

export const getNativeBalance = async (req, res) => {
    try {
        const address = req.body.address;

        const provider = new ethers.JsonRpcProvider(testnetJSONRPC.polygonZkEVM);

        const balance = await provider.getBalance(address); 
        const convertedBalance = ethers.formatEther(balance); 
        

        console.log(balance)
        console.log(convertedBalance);

        res.status(200).json({
            balance: balance.toString(), // Convert BigInt to string
            formattedBalance: convertedBalance
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};



export const queryTokenBalance = async (req, res) => {

  const { walletAddress , erc20ContractAddress } = req.params;  

  const provider = new ethers.JsonRpcProvider(testnetJSONRPC.ethereum);


  try {   
    const tokenContract = new ethers.Contract(
      erc20ContractAddress,
      tokenABI,
      provider
    );


    const tokenName = await tokenContract.name()
    const  balance = await tokenContract.balanceOf(walletAddress)
    const decimals = await tokenContract.decimals()
    const convertedBalance = convertFromTokenUnits(balance , decimals)
 

    res.json({ erc2oBalance : convertedBalance,   name : tokenName
    })
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
