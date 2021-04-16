import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import HttpStatusCodes from 'http-status-codes';

import List, { IList } from '../models/list';

class ListController {
  async create(req: Request, res: Response) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array(), data: null });
		}

		try {
			const { authorId, title, description, categoryId } = req.body;
			
			let list: (IList | null) = await List.findOne({ title });

			if (list) {
				return res.status(HttpStatusCodes.CONFLICT).json({
					errors: [
						{
							msg: 'List already exists!'
						}
					],
					data: null
				});
			}

			const listFields = {
				author: authorId,
        title,
        description,
        category: categoryId
			};

			list = new List(listFields);

			await list.save();

			res.status(HttpStatusCodes.CREATED).json({ errors: null, data: list });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

  async findAll(_req: Request, res: Response) {
		try {
			const lists: IList[] = await List
				.find()
				.populate('author')
				.populate('category')
				.populate('tasks');

			res.json({ errors: null, data: lists });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

  async findOne(req: Request, res: Response) {
		const listID: string = req.params['id'];

		try {
			const list: IList | null = await List.findById(listID);

			res.json({ errors: null, data: list });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

  async update(req: Request, res: Response) {
		const listID: string = req.params['id'];

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array(), data: null });
		}

		try {
			const data = req.body;

			await List.findOneAndUpdate(
				{ _id: listID },
				{ $set: data },
				{ new: true }
			)
				.then(list => res.json({ errors: null, data: list }))
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
		const listID: string = req.params['id'];

		try {
			await List.findByIdAndRemove(listID);

			res.json({ errors: null, data: 'List successful removed!' });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}
}

export default new ListController();
