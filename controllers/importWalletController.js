import { Wallet , Mnemonic} from 'ethers'
import { encrypt , decrypt} from "../helpers/encryption_helpers.js"



 export const importWalletFromPrivateKey = async(req,res) => {

   const { privateKey }= req.body

    const wallet =  new Wallet(privateKey)
    const address = wallet.address
    const privateKey_1= wallet.privateKey
    // Cant access mnemonics because importing through privatekey


    const walletDetails = {
        address : address,
        privateKey : privateKey_1,
        encryptedPrivateKey : encrypt(privateKey)
    }
   res.status(200).json(walletDetails)

}

// const privateKey = decrypt("14f7ad9d6b912d611af9536fd6be310f811d4991008d36506e3096e20256819b2b166eaaef417f4a38752aed227f08f6dc6a336111e52ed41f4a9fd0cbfcf91aa62ceb1d34aa991bf7db7d8bf1fdde3c")
// const walletDetails1 = importWalletFromPrivateKey(privateKey)

// console.log(walletDetails1)


export const importWalletFromMnemonic = async(req,res) => {

    const mnemonic = req.body.mnemonic

    const wallet = new  Wallet.fromPhrase(mnemonic)
    const address = wallet.address
    const privateKey = wallet.privateKey
    const mnemonic_2= wallet.mnemonic.phrase


    const walletDetails = {
        address : address,
        privateKey : privateKey,
         mnemonics : mnemonic_2
    }


    res.status(200).json(walletDetails)
}


