import { model, Schema } from 'mongoose';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  about: {
    type: String,
    required: true,
    min: 2,
    max: 300,
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default model<IUser>('user', userSchema);
