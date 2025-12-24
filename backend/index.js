import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./utils/database.js"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import companyRouter from "./routes/company.route.js"


dotenv.config({})

const app = express()

// app.get("/home", (req, res)=>{
//     try {
//         return res.status(200).json({
//             message: "Backend server",
//             success: true
//         })
//     } catch(error){
//         return res.status(404).json({
//             message: `Server error ${error}`,
//             success: false
//         })
//     }
// })

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOption = {
    origin:"http//localhost:5173",
    credentials:true
}
app.use(cors(corsOption))

const PORT = process.env.PORT || 3000

//API
app.use("/api/v1/user", userRouter)
app.use("/api/v1/company", companyRouter)

app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server running at port ${PORT}`)
})