// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const userSchema = new mongoose.Schema({
//     username: {
//         type : "string" ,
//         required : true,
//         unique : true,
//         trim : true
//     },
//     password : {
//         type : "string",
//         required : true,
//         unique : true,
//         trim : true
//     },
//     emailId : {
//         type : "string",
//         required : true,
//         trim : true
//     },
//     refreshToken :{
//         type : "string",
//         default : null
//     }
// } , { timeStamps : true})

// userSchema.pre("save", async function(next){ 
//     if(!this.isModified("password")) return next();

//     this.password =  await bcrypt.hash(this.password,10)
//     next()

// })


// userSchema.methods.isPasswordCorrect = async function(password){
//     try{
//         return await bcrypt.compare(password,this.password)

//     }
//     catch( err) {
//         console.error( " Password not verifiable " , err);
//         return false;
//     }
// }

// userSchema.methods.generateAccessToken =  function(){
//     return jwt.sign(
//        { 
//             _id: this._id,
//             emailId : this.emailId,
//             username : this.username,
//        },
//        process.env.ACCESS_TOKEN_SECRET,
//        {
//             expiresIn: process.env.ACCESS_TOKEN_EXPIRY
//        }
//     )
// }

// userSchema.methods.generateRefreshToken =  function(){
//     return jwt.sign(
//        { 
//             _id: this._id,
//        },
//        process.env.REFRESH_TOKEN_SECRET,
//        {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//        }
//     )
// }


// export const User = mongoose.model("User",userSchema);
