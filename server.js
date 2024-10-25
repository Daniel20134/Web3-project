import express from 'express'
const app = express()
import walletRoutes from './routes/walletRoutes.js'


app.use(express.json())

app.use('/wallets' , walletRoutes)






app.listen(4000 , () => {
    console.log("Server is running on 4000")
})