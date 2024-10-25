import axios from "axios";

import dotenv from 'dotenv'
dotenv.config()


const ApiKey = process.env.API_KEY



 export const fetchTransactionHistory = async (req,res) => {
    const { address } = req.body

    const url = `https://api-cardona-zkevm.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${ApiKey}`
    const response = await axios.get(url)

    console.log(response.data)


   if(response.data.status === "1"){
    const message = response.data.message
    const txHash = response.data.result[1]
    res.status(200).json({
        message : message,
        txHash : txHash
    })
   }

   else{
    res.status(400).json({
        success : false,
        error : "Error fetching transactions"
    })
   }

 
}