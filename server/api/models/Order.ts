import mongoose, { Schema } from "mongoose";

export type OrderType = {
    customer: mongoose.Schema.Types.ObjectId;
    product: mongoose.Schema.Types.ObjectId;
    referralUsed?: mongoose.Schema.Types.ObjectId;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<OrderType>({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    referralUsed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Referral",
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
export default Order;