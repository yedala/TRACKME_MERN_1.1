const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected ${conn.connection.host}`)
    }
   catch(error) {
    console.error(`error a: ${error}`);
    process.exit();
   }
}

module.exports = connectDB;