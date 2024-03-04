const mongoose = require('mongoose')

const connectDB = (url) => {
    console.log('Connected to DB')
    return mongoose.connect(url);
}

// module.exports = connectDB

// const { MongoClient } = require('mongodb');
 
 
//    const uri = 'mongodb+srv://praveen:1234@cluster0.4ygvrqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
   // Create a new MongoClient
//    const client = new MongoClient(uri);
   
   // Connect to the MongoDB cluster
//    const connectDB =async ()=> {
//        try {
//            await mongoose.connect();
//            console.log('Connected to the database');
//        } catch (error) {
//            console.error('Error connecting to the database:', error);
//        }
//    }
   
//    module.exports = connectDB

// const connectDB = async (uri) => {
//     try {
//         await mongoose.connect(uri, {
//         });
//         console.log('MongoDB connected successfully');
//     } catch (err) {
//         console.error('MongoDB connection error:', err);
//         process.exit(1);
//     }
// };
module.exports = connectDB