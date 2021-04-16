import { ITask } from './task';
import { Document, Model, model, Schema } from 'mongoose';
import { ICategory } from './category';
import { IUser } from './user';

/**
 * List Interface
 * @param author:ref => User._id
 * @param title:string
 * @param description:string
 * @param category:ref => Category._id
 */
export interface IList extends Document {
  author: IUser['_id'];
  title: string;
  description: string;
  category: ICategory['_id'];
  tasks: ITask['_id'][]
}

const listSchema: Schema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  title: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },

  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }]
});

const List: Model<IList> = model('List', listSchema);

export default List;
