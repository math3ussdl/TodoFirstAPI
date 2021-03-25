import { Document, Model, model, Schema } from 'mongoose';

/**
 * Status Interface
 * @params description:string
 */
export interface IStatus extends Document {
  description: string;
}

const statusSchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
    unique: true
  }
});

const Status: Model<IStatus> = model('Status', statusSchema);

export default Status;
