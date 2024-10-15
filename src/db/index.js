import { DB_NAME } from './constant.js';
import mongoose from 'mongoose';

const connectDB = async() =>{
    try {
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance.Connection.host}`);
      
    } catch (error) {
        console.error('MONGODB connection error:', error)
        process.exit(1)
    }
}

export {connectDB}