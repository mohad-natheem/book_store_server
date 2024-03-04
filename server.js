const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const authRouter = require('./routers/auth_router')
const bookRouter = require('./routers/book_router')
const transactionRouter = require('./routers/transactions_router')
const adminRouter = require('./routers/admin_router')

const {authenticateToken} = require('./middlewares/auth_middleware')
const {isAdmin} = require('./middlewares/admin_middleware')


const connectDB = require('./configs/database_config');

const uri = 'mongodb+srv://praveen:1234@cluster0.4ygvrqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace 'your_mongodb_uri' with your actual MongoDB URI
const PORT = 8000



// //Middlewares
app.use(cors())
app.use(express.json())
// app.use('/public',express.static('public'))



// //Routes
app.use('/auth',authRouter);

app.use('/books',authenticateToken,bookRouter);

app.use('/transactions',authenticateToken,transactionRouter);

app.use('/admin',authenticateToken,isAdmin,adminRouter);


const start = async ()=>{
    try{
        await connectDB(uri)
        console.log('Connect to DB')
        app.listen(process.env.PORT,()=>{
            console.log(`Server listening to port ${PORT}`);
        },)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
start()