import mongoose, { Schema } from "mongoose";

export type ProductType = {
    title: string;
    description: string;
    orders: mongoose.Schema.Types.ObjectId[];
    author: mongoose.Schema.Types.ObjectId;
    consumers: mongoose.Schema.Types.ObjectId[];
    productType: "COURSE" | "EVENT";
    image: mongoose.Schema.Types.ObjectId;
    productSections: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<ProductType>({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
    }],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    consumers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    productType:{
        type:String,
        enum:["COURSE","EVENT"],
        required:true,
    },
    image:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"File",
        required:true,
    },
    productSections:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    }],
},{timestamps:true});

export const Product = mongoose.model("Product", productSchema);
export default Product;