import { Document, Model, model, Schema } from 'mongoose';

/**
 * Category Interface
 * @param description:string
 */
export interface ICategory extends Document {
  description: string;
}

const categorySchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
    unique: true
  }
});

const Category: Model<ICategory> = model('Category', categorySchema);

export default Category;
