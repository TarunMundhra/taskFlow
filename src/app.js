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
        origin : true,
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

// import userRoutes from "./routes/user.route.js"
import taskRoutes from "./routes/task.route.js"
import dependencyRoutes from "./routes/dependency.route.js"

// routes 
// app.use("/api/v1/users" , userRoutes)
app.use("/api/v1/tasks" , taskRoutes)
app.use("/api/v1/dependencies" , dependencyRoutes)

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


 
export {app}