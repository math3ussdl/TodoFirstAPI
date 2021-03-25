import { Document, Model, model, Schema } from 'mongoose';
import { IList } from './list';
import { IUser } from './user';

/**
 * Task Interface
 * @param list:ref => List._id
 * @param description:string
 * @param dt_prev:string
 * @param dt_exec:string
 * @param responsible:ref => User._id
 */
export interface ITask extends Document {
  list: IList['_id'];
  description: string;
  dt_prev: string;
  dt_exec: string;
  responsible: IUser['_id'];
}

const taskSchema: Schema = new Schema({
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  },

  description: {
    type: String,
    required: true,
    unique: true
  },

  dt_prev: {
    type: String,
    required: true
  },

  dt_exec: {
    type: String,
    required: true
  },

  responsible: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Task: Model<ITask> = model('Task', taskSchema);

export default Task;
