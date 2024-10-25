import express from 'express'
const router = express.Router()
import { createWallet , createEncryptedWallet }from '../controllers/createWalletController.js'
import { importWalletFromMnemonic, importWalletFromPrivateKey} from "../controllers/importWalletController.js"
import { getNativeBalance, queryTokenBalance } from '../controllers/getBalancesController.js'
import { transferNativeToken } from '../controllers/sendNativeTokenController.js'
import { sendERC20Token } from '../controllers/sendErc20tokensController.js'
import { fetchTransactionHistory } from '../controllers/FetchTransactionHistory.js'



router.get("/createWallet" , createWallet)

router.get("/createEncryptedWallet" , createEncryptedWallet)

router.post("/importWalletFromPrivateKey" , importWalletFromPrivateKey)

router.post("/importWalletFromMnemonic" , importWalletFromMnemonic)

router.post("/getNativeBalance" , getNativeBalance)


router.get("/getTokenBalance/:erc20ContractAddress/:walletAddress" , queryTokenBalance)


router.post("/transferNativeToken" , transferNativeToken)


router.post("/sendErc20" , sendERC20Token)


router.post("/getHistory" , fetchTransactionHistory)



export  default router



