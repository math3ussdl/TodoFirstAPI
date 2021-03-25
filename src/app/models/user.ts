import { Document, Model, model, Schema } from 'mongoose';

/**
 * User Interface
 * @param name:string
 * @param phone:string
 * @param email:string
 */
export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  }
});

const User: Model<IUser> = model('User', userSchema);

export default User;
