const mongoose = require('mongoose');
require('dotenv').config();

const connectDB =async () =>{
   try{
    const conn = await mongoose.connect(process.env.MONGO_DB);
    console.log('connected to db',conn.connection.host);
   }catch(error){
    console.log(error);
    process.exit(1);
   }
}

module.exports = connectDB;