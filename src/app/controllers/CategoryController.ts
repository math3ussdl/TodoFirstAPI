import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import HttpStatusCodes from 'http-status-codes';

import Category, { ICategory } from '../models/category';

class CategoryController {
  async create(req: Request, res: Response) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array(), data: null });
		}

		try {
			const { description } = req.body;
			
			let category: (ICategory | null) = await Category.findOne({ description });

			if (category) res.status(HttpStatusCodes.OK).json({ errors: null, data: category });

			const categoryFields = { description };

			category = new Category(categoryFields);

			await category.save();

			res.status(HttpStatusCodes.CREATED).json({ errors: null, data: category });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

  async findAll(_req: Request, res: Response) {
		try {
			const categories: ICategory[] = await Category.find();

			res.json({ errors: null, data: categories });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

	async findOne(req: Request, res: Response) {
		const categoryID: string = req.params['id'];

		try {
			const category: ICategory | null = await Category.findById(categoryID);

			res.json({ errors: null, data: category });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

	async update(req: Request, res: Response) {
		const categoryID: string = req.params['id'];

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array(), data: null });
		}

		try {
			const data = req.body;

			await Category.findOneAndUpdate(
				{ _id: categoryID },
				{ $set: data },
				{ new: true }
			)
				.then(category => res.json({ errors: null, data: category }))
				.catch(err => {
					console.error(err.message);
					res
						.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
						.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
				});
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

	async delete(req: Request, res: Response) {
		const categoryID: string = req.params['id'];

		try {
			await Category.findByIdAndRemove(categoryID);

			res.json({ errors: null, data: 'Category successful removed!' });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}
}

export default new CategoryController();
