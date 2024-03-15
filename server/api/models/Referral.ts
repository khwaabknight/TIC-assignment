import mongoose, { Schema, model, Document } from 'mongoose';

type ReferralType = {
    provider: Schema.Types.ObjectId;
    discountPercentage: number;
    product: Schema.Types.ObjectId;
    validity: Date;
    createdAt: Date;
    updatedAt: Date;
}

const referralSchema = new Schema<ReferralType>({
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    validity: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
}, {timestamps: true});

const Referral = model<ReferralType>('Referral', referralSchema);

export default Referral;