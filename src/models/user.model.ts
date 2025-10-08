import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { IUser } from '../types/user.types';

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    user.password = await bcrypt.hash(user.password, 10);

    next();
});

export const UserModel = model<IUser>('User', userSchema);
