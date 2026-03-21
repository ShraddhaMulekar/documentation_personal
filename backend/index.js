import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { mongoDB } from "./config/mongodb.js"
dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())



app.listen(port, async()=>{
    await mongoDB()
    console.log(`server connected on http://localhost:${port}`)
})