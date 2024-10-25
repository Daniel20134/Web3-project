import { ethers } from  'ethers'
import testnetJSONRPC from '../rpc.js'
import { decrypt } from '../helpers/encryption_helpers.js'


export const transferNativeToken = async(req,res) => {
    const { address , amount , privateKey } = req.body 
   try {
   

    const provider = new ethers.JsonRpcProvider(testnetJSONRPC.polygonZkEVM)

    const decryptedPrivatekey = decrypt(privateKey)

    const walletInstance = new ethers.Wallet(decryptedPrivatekey , provider)

    const value = ethers.parseEther(amount.toString())

    const tx = await walletInstance.sendTransaction({ address , value})

    console.log("============Making transaction =========")
    console.log(tx)
    res.status(200).json({
        hash : tx.hash
    })

   } catch (error) {
    console.log(error);
 res.status(500).json({ error: error.message });
   }

}