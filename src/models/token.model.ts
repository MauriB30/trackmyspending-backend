import { model, Schema } from 'mongoose';
import { IToken } from '../types/token.types';

const tokenSchema = new Schema<IToken>(
    {
        token: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

export const tokenModel = model<IToken>('Token', tokenSchema);
