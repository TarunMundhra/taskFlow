// import { User } from "../models/user.models.js";

// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/apiError.js";
// import { ApiResponse } from "../utils/apiResponse.js";
// import jwt from "jsonwebtoken"

// const generateAccessTokenAndrefreshToken = async(userId) => {
//     try {
//         const user = await User.findById(userId)
//         const accessToken = user.generateAccessToken()
//         const refreshToken = user.generateRefreshToken()    

//         user.refreshToken = refreshToken

//         await user.save({validateBeforeSave : false})

//         return { accessToken , refreshToken }
//     } catch (error) {
//         console.log(error);
//         throw new ApiError(500,"Something went wrong while generating AccessToken or refreshToken")
//     }
// }

// const registerUser = asyncHandler( async (req,res) => {

//     const{fullName,email,username,password} = req.body
//     console.log("email:",email)
//     if(
//         [email, username, password].some((field) =>
//         field?.trim() === "")
//     ){
//         throw new ApiError(400,"All fields are required");
//     }

//     const existedUser = await User.findOne({
//         $or: [ { username }, { email }]
//     })

//     if(existedUser){
//         throw new ApiError(409, "user with same username already exists")
//     }
    
//     const user = await User.create({
//         fullName,
//         email,      
//         password,
//         username : username.toLowerCase()
//     })

//     const userCreated = await User.findById(user._id).select( 
//         "-password -refreshToken"
//     )
//     if (!userCreated) {
//         throw new ApiError(500, "Something went wrong while registering the user")
//     }

//     return res
//     .status(201)
//     .json(
//         new ApiResponse(200, userCreated, "user registered successfully")
//     )
// })

// const loginUser = asyncHandler(async(req,res) =>{
//     // req.body -> data
//     // username or email
//     // find the user
//     //password check
//     //access and refresh token renegrate 
//     // send cookie
    
//     const {emailId ,username,password}  = req.body

//     if(!(emailId || username)){
//         throw new ApiError(400,"Either email or username is  required ")
//     }

//     const user = await User.findOne({
//         $or : [{emailId},{username}]
//     })

//     if(!user){
//         throw new ApiError(404,"User is not registered or found")
//     }

//     const validatePassword = await user.isPasswordCorrect(password)

//     if(!validatePassword){
//         throw new ApiError(401,"wrong user credentials")
//     }

//     const {accessToken,refreshToken} = await 
//     generateAccessTokenAndrefreshToken(user._id)


//     const loggedInUser = await User.findById(user._id).
//     select("-password -refreshToken")

//     const options = {
//         httpOnly : true, // allows only server to modify cookies 
//         sucure : true
//     }

//     return res
//     .status(200)
//     .cookie("refreshToken", refreshToken,options)
//     .cookie("accessToken",accessToken,options)
//     .json(
//         new ApiResponse(
//             200,
//             {
//                 user: loggedInUser, 
//                 accessToken: accessToken,
//                 refreshToken: refreshToken
//             },
//             "user logged in successfully"
//         )
//     )
// })


// const logoutUser = asyncHandler(async(req,res) =>{
//     //req.user._id //.user created during jwtverify similar to req.body and req.cookie
//      await  User.findByIdAndUpdate(
//         req.user._id,
//         {
//             $unset : {
//                 refreshToken : 1,

//             }
//         },
//         {
//             new : true
//         }
//     )

//     const options = {
//         httpOnly : true, // allows only server to modify cookies 
//         sucure : true
//     }

//     return res
//     .status(200)
//     .clearCookie("accessToken" , options)
//     .clearCookie("refreshToken", options)
//     .json(new ApiResponse(200,{},"User logged out successfully"))
// })

// const refreshAccessToken = asyncHandler(async(req,res) =>{
//     const incomingRefeshToken = req.cookies.refreshToken 
//     || req.body.refreshToken //req.body for mobile application
//     if(!incomingRefeshToken){
//         throw new ApiError(401,"Invalid RefreshError during regenerating access token")
//     }

//     try {
//         const decodedRefreshToken = jwt.verify(
//             incomingRefeshToken,
//             process.env.REFRESH_TOKEN_SECRET
//         )
        
//         const user = await User.findById(decodedRefreshToken?._id)
    
//         if(!user){
//             throw new ApiError(401,"user not found while regenerating access token")
//         }
        
//         if(incomingRefeshToken !== user?.refreshToken){
//             throw new ApiError(401,"refresh token is expired or used")
//         }
    
//         const options = {
//             httpOnly :  true,
//             sucure : true
//         }
    
//         const { accessToken , newRefreshToken }  = await generateAccessTokenAndrefreshToken(user._id)
    
//         return res
//         .status(200)
//         .cookie("accessToken",accessToken,options)
//         .cookie("refreshToken",newRefreshToken,options)
//         .json(
//             new ApiResponse(
//                 200,
//                 {accessToken , refreshToken : newRefreshToken},
//                 "Access token refreshed succussfully"
//             )
//         )
//     } catch (error) {
//         throw new ApiError(401,error?.message || 
//         "Invaild access token 222")
//     }
// })

// const changePassword = asyncHandler(async(req,res) =>{
//     const {oldPassword, newPassword} = req.body

//     if(!oldPassword || !newPassword){
//         throw new ApiError(400,"Old password and new password are required")
//     }

//     const user = await User.findById(req.user._id)

//     if(!user){
//         throw new ApiError(404,"User not found")
//     }

//     const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

//     if(!isPasswordCorrect){
//         throw new ApiError(401,"Old password is incorrect")
//     }

//     user.password = newPassword
//     await user.save({validateBeforeSave : true})

//     return res
//     .status(200)
//     .json(
//         new ApiResponse(200,{}, "Password changed successfully")
//     )
// })

// const getCurrentUser = asyncHandler(async(req,res) =>{
    
//     const user = await User.findById(req.user._id)
//     .select("-password -refreshToken")

//     return res
//     .status(200)
//     .json(
//         new ApiResponse(200, user, "Current user fetched successfully")
//     )
// })

// const updateAccount = asyncHandler(async(req,res) =>{
//     const {emailId ,username} = req.body

//     if(!username || !emailId){
//         throw new ApiError(400,"username and email are required")
//     }

//     const checkEmailExists = await User.findOne({
//         emailId : emailId,
//         _id : { $ne : req.user._id } // not equal to current user id
//     })

//     if(checkEmailExists){
//         throw new ApiError(409,"EmailId already in use , try different one")
//     }

//     const user = await User.findByIdAndUpdate(
//         req.user._id, //extracted from jwt midddleware
//         {
//             $set: {
//                 emailId : emailId,
//                 username: username
//             }
//         },
//         { new: true, runValidators: true } // to return the updated user and validate before saving
//     ).select("-password");

//     return res
//     .status(200)
//     .json(
//         new ApiResponse(200, user, "User account updated successfully")
//     )
// })


// export {
//     registerUser,
//     loginUser,
//     logoutUser,
//     refreshAccessToken,
//     changePassword,
//     getCurrentUser,
//     updateAccount,
// }