import {Router} from "express";
import { 
    changePassword, 
    getCurrentUser,
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
    updateaccount } from "../controllers/user.controller.js";
    
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router =  Router()

router.use((req, res, next) => {
  console.log(`Incoming request to user route: ${req.method} ${req.url}`);
  next();
});

router.route("/register").post(registerUser)
router.route("/login").post( loginUser )

//secured routes
router.route("/logout").post(verifyJWT , logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,changePassword)
router.route("/getCurrentUser").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateaccount)

export default router