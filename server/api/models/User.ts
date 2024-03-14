import mongoose, { Schema } from "mongoose";

export type UserType = {
    name: string;
    email: string;
    password: string;
    accountType: "CONSUMER" | "ADMIN";
    image: mongoose.Schema.Types.ObjectId;
    products: mongoose.Schema.Types.ObjectId[];
    purchases: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserType>({
    name:{
        type:String,
        required:true,
        unique:true,
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
        type:mongoose.Schema.Types.ObjectId,
        ref:"File",
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    }],
    purchases:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
    }],
});

userSchema.pre('save',function(next){
    this.updatedAt = new Date();
    if(!this.createdAt){
        this.createdAt = new Date();
    }
    next();
})


export const User = mongoose.model<UserType>("User", userSchema);
export default User;