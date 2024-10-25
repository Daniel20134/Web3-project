import crypto from "crypto"
import  { INIT_VECTOR , SECRET_INIT} from "./env_helpers.js"



const secret = SECRET_INIT 
const initVector = INIT_VECTOR

export const encrypt = (mnemonic) => {
    const cipher = crypto.createCipheriv("aes256" , secret , initVector)
    const mnemonic_e =
    cipher.update(mnemonic, "utf8", "hex") + cipher.final("hex");
  
    return mnemonic_e
}


export const decrypt = (encrypted) => {
    const decipher = crypto.createDecipheriv("aes256" , secret , initVector)
    const decipheredMnemonic = decipher.update(encrypted , "hex" , "utf8") + decipher.final("utf8")

    return decipheredMnemonic
}
