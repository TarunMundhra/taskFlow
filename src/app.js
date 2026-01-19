import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"

const app = express()

// checking server
// app.get("/", (req, res) => {
//   res.send("Server is running on port 8000");
// });

app.use(cors(
    {
        origin : process.env.CORS_ORIGIN,
        credentials : true
    }
))

app.use( express.json( {
    limit : "16kb"
}))

app.use(express.urlencoded({ extended : true , limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// import routes

import userRoutes from "./routes/user.route.js"

// routes 
app.use("/api/v1/users" , userRoutes)

app.use( ( req, res, next) =>{
    const error = new Error(`
    Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
})
 
export {app}