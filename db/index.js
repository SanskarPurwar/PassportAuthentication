// const mongoose = require('mongoose');
// const DB_NAME = require('../constants').DB_NAME

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async ()=> {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB host : ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.error('Error: ye rha', error);
        process.exit(1);
    }
}
export default connectDB