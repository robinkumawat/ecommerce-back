import express from "express"
import cors from 'cors'
import mongoose from "mongoose"
import ProductRouter from "./ProductRouter.js"

const connection = mongoose.connect("mongodb://127.0.0.1:27017/e-commerce")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({origin: "http://localhost:5173"}))

app.use('/uploads', express.static('uploads'));

app.use("/product", ProductRouter)

connection.then(() => {
    app.listen(5000, () => {
        console.log("Server is Started at 5000")
    })
})

.catch((err)=>{
    if(err){
        console.log("There is an error",err)
    }
})

