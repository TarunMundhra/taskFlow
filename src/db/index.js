import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import dotenv from "dotenv"

dotenv.config()

const connectDB = async() =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log( ` \n MONGODB database connected HOST: ${connectionInstance.connection.host}`)
    }
    catch(e){
        console.log( " MONGODB CONNECTION failed , try something different:" , err)
        process.exit(1);
    }
}

export default connectDB;