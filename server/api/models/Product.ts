import mongoose, { Schema } from "mongoose";

export type ProductType = {
    title: string;
    description: string;
    orders: Schema.Types.ObjectId[];
    author: Schema.Types.ObjectId;
    consumers: Schema.Types.ObjectId[];
    productType: "COURSE" | "EVENT";
    image: Schema.Types.ObjectId;
    productSections: Schema.Types.ObjectId[];
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
        type:Schema.Types.ObjectId,
        ref:"Order",
    }],
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    consumers:[{
        type:Schema.Types.ObjectId,
        ref:"User",
    }],
    productType:{
        type:String,
        enum:["COURSE","EVENT"],
        required:true,
    },
    image:{
        type:Schema.Types.ObjectId,
        ref:"File",
        required:true,
    },
    productSections:[{
        type:Schema.Types.ObjectId,
        ref:"Section",
    }],
},{timestamps:true});

export const Product = mongoose.model("Product", productSchema);
export default Product;