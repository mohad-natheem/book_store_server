const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require('nodemailer')

require('dotenv').config()

const authRouter = require('./routers/auth_router')
const bookRouter = require('./routers/book_router')
const transactionRouter = require('./routers/transactions_router')
const adminRouter = require('./routers/admin_router')
const progressRouter = require('./routers/progress_router')
const otpRouter = require('./routers/otp_router')

const { authenticateToken } = require('./middlewares/auth_middleware')
const { isAdmin } = require('./middlewares/admin_middleware')


const connectDB = require('./configs/database_config');
const transactionCollection = require('./models/transaction_model')
const user = require('./models/user_model')
const bookCollection = require('./models/book_model')




// //Middlewares
app.use(cors())
app.use(express.json())
app.use('/public', express.static('public'))



// //Routes
if (process.env.ENV == "DEV") {
    app.use('/auth', authRouter);

    app.use('/books', bookRouter);

    app.use('/transactions', transactionRouter);

    app.use('/admin', adminRouter);

    app.use('/otp', otpRouter);

    app.use('/progress', progressRouter)
} else if (process.env.ENV == "PROD") {
    app.use('/auth', authRouter);

    app.use('/books', authenticateToken, bookRouter);

    app.use('/transactions', authenticateToken, transactionRouter);

    app.use('/admin', authenticateToken, isAdmin, adminRouter);

    app.use('/progress', authenticateToken, progressRouter)

    app.use('/otp', otpRouter);

}

let transporter = nodemailer.createTransport({
    service:"gmail",
    user:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        type:"login",
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS
    }
})

const checkDueDate = async() => {
   try {
    const transaction =await transactionCollection.deleteMany({ due_date: { $lt: Date.now(), $ne:null },purchase_type:"rented" })
   } catch (error) {
    console.log(error);
   }

}
const sendReminder = async() => {
    try {
        const currentDate = Date.now()

        const transaction =await transactionCollection.find({ due_date: { $ne:null },purchase_type:"rented" })
        const usersToRemind = transaction.filter((transaction)=>{
            if(currentDate >= transaction.due_date - (15 * 24 * 60 * 60 * 1000)){
                return transaction
            }
        })

        usersToRemind.forEach(async(transaction)=>{
            let user_id = transaction.user_id
            let book_id = transaction.book_id
            const transacted_user = await user.findOne({user_id})
            const transacted_book = await bookCollection.findOne({book_id})
            console.log(transacted_user,transacted_book);
            const mailConfig = {
                from:process.env.AUTH_EMAIL,
                to:transacted_user.email,
                subject:"Due Reminder | NOVELNOOK",
                html:`<p>Your subscription to ${transacted_book.book_name} is about to end in 15 days. <br/>Renew your subscription to continue reading.</p>`
            }
            await transporter.sendMail(mailConfig);
        })
    } catch (error) {
        
    }
}
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        console.log('Connect to DB')
        app.listen(process.env.PORT, () => {
            console.log(`Server listening to port ${process.env.PORT}`);
        },)
        await sendReminder()    
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

start()

setInterval(checkDueDate, 24 * 60 * 60 * 1000);
setInterval(sendReminder, 24 * 60 * 60 * 1000);