import mongoose, { Schema, Document } from 'mongoose';

export type FileType = {
    url: string;
    fileId: string;
}

const FileSchema: Schema = new Schema<FileType>({
    url: { type: String, required: true },
    fileId: { type: String, required: true },
}, { timestamps: true });

const File = mongoose.model<FileType>('File', FileSchema);
export default File;