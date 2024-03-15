import mongoose, { Schema } from "mongoose";
import { FileType } from "./File";

export type UserType = {
    name: string;
    email: string;
    password: string;
    accountType: "CONSUMER" | "ADMIN";
    image: Schema.Types.ObjectId | FileType;
    products: Schema.Types.ObjectId[];
    purchases: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserType>({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["CONSUMER","ADMIN"],
        default:"CONSUMER",
    },
    image:{
        type:Schema.Types.ObjectId,
        ref:"File",
    },
    products:[{
        type:Schema.Types.ObjectId,
        ref:"Product",
    }],
    purchases:[{
        type:Schema.Types.ObjectId,
        ref:"Order",
    }],
});

userSchema.pre('save',function(next){
    this.updatedAt = new Date();
    if(!this.createdAt){
        this.createdAt = new Date();
    }
    next();
});

export const User = mongoose.model<UserType>("User", userSchema);
export default User;