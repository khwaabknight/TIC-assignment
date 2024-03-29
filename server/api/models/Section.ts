import mongoose, { Schema, Document, Types } from 'mongoose';
import { FileType } from './File';

type SectionType = {
    name: string;
    description: string;
    video?: Schema.Types.ObjectId | FileType;
    product: Schema.Types.ObjectId;
}

const sectionSchema: Schema<SectionType> = new Schema<SectionType>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: 'File',
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
});

export default mongoose.model<SectionType>('Section', sectionSchema);