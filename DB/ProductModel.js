import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema({
    name:String,
    price:Number,
    company:String,
    category:String,
    photo:Object
})

const ProductModel=mongoose.model("poducts",ProductSchema)
 

export default ProductModel;