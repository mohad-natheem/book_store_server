const express = require('express')
const app = express()
const cors = require('cors')

// const authRouter = require('./routers/auth_router')
const bookRouter = require('./routers/book_router')


const connectDB = require('./configs/database_config');

const uri = 'mongodb+srv://praveen:1234@cluster0.4ygvrqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace 'your_mongodb_uri' with your actual MongoDB URI
const PORT = 8000



// //Middlewares
app.use(cors())
app.use(express.json())
// app.use('/public',express.static('public'))



// //Routes
// app.use('/auth',authRouter);

app.use('/books',bookRouter);


const start = async ()=>{
    try{
        await connectDB(uri)
        console.log('Connect to DB')
        app.listen(PORT,()=>{
            console.log(`Server listenin to port ${PORT}`);
        },)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
start()