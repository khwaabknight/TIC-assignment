import mongoose, { Schema } from "mongoose";

export type OrderType = {
    customer: Schema.Types.ObjectId;
    product: Schema.Types.ObjectId;
    referralUsed?: Schema.Types.ObjectId;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<OrderType>({
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    referralUsed: {
        type: Schema.Types.ObjectId,
        ref: "Referral",
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
export default Order;