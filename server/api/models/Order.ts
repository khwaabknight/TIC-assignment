import mongoose, { Schema } from "mongoose";

export type OrderType = {
    rzpOrderId: string;
    customer: Schema.Types.ObjectId;
    instructor: Schema.Types.ObjectId;
    product: Schema.Types.ObjectId;
    amount: number;
    referralUsed?: Schema.Types.ObjectId;
    status: "PENDING" | "COMPLETED" | "FAILED";
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<OrderType>({
    rzpOrderId: {
        type: String,
        required: true,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    referralUsed: {
        type: Schema.Types.ObjectId,
        ref: "Referral",
    },
    status: {
        type: String,
        enum: ["PENDING", "COMPLETED", "FAILED"],
        default: "PENDING",
    }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
export default Order;