import { ethers } from 'ethers';
import { encrypt , decrypt} from '../helpers/encryption_helpers.js';

export const createWallet = async (req, res) => {
    const Wallet = ethers.Wallet.createRandom();
    const address = Wallet.address;
    const privateKey = Wallet.privateKey;
    const mnemonic = Wallet.mnemonic.phrase.toString()

    const encryptedMnemonics = await encrypt(mnemonic); // Fix the spelling here
    
    const wallet = {
        address: address,
        privateKey: privateKey,
        mnemonicPhrase: mnemonic,
    };
   
    
    console.log(wallet);
    // Optionally, send a response to the client if needed
    res.json(wallet); // Example response to send the wallet info
};




export const createEncryptedWallet =  async(req,res) => {
    const Wallet = ethers.Wallet.createRandom()
    const address = Wallet.address
    const privateKey = Wallet.privateKey
    const mnemonicPhrase = Wallet.mnemonic.phrase



    const privateKey_1 = encrypt(privateKey)
    const mnemonics = encrypt(mnemonicPhrase)
 

    const encryptedWallet = {
        address : address,
        privateKey : privateKey_1,
        mnemonicPhrase :mnemonics
    }


    console.log(encryptedWallet)


    res.status(200).json(encryptedWallet)
}


