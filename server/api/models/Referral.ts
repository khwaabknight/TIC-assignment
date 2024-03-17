import mongoose, { Schema, model, Document } from 'mongoose';

type ReferralType = {
    provider: Schema.Types.ObjectId;
    product: Schema.Types.ObjectId;
    usedBy: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const referralSchema = new Schema<ReferralType>({
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    usedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
}, {timestamps: true});

referralSchema.index({createdAt: 1},{expireAfterSeconds: 3 * 24 * 60 * 60 * 1000});

const Referral = model<ReferralType>('Referral', referralSchema);

export default Referral;