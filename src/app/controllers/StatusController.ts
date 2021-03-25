import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import HttpStatusCodes from 'http-status-codes';

import Status, { IStatus } from '../models/status';

class StatusController {
  async create(req: Request, res: Response) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array(), data: null });
		}

		try {
			const { description } = req.body;
			
			let status: (IStatus | null) = await Status.findOne({ description });

			if (status) {
				return res.status(HttpStatusCodes.CONFLICT).json({
					errors: [
						{
							msg: 'Status already exists!'
						}
					],
					data: null
				});
			}

			const statusFields = { description };

			status = new Status(statusFields);

			await status.save();

			res.status(HttpStatusCodes.CREATED).json({ errors: null, data: status });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

  async findAll(_req: Request, res: Response) {
		try {
			const statuses: IStatus[] = await Status.find();

			res.json({ errors: null, data: statuses });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

  async findOne(req: Request, res: Response) {
		const statusID: string = req.params['id'];

		try {
			const status: IStatus | null = await Status.findById(statusID);

			res.json({ errors: null, data: status });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

  async update(req: Request, res: Response) {
		const statusID: string = req.params['id'];

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array(), data: null });
		}

		try {
			const data = req.body;

			await Status.findOneAndUpdate(
				{ _id: statusID },
				{ $set: data },
				{ new: true }
			)
				.then(status => res.json({ errors: null, data: status }))
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
		const statusID: string = req.params['id'];

		try {
			await Status.findByIdAndRemove(statusID);

			res.json({ errors: null, data: 'Status successful removed!' });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}
}

export default new StatusController();
