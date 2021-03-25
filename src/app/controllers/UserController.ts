import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import HttpStatusCodes from 'http-status-codes';

import User, { IUser } from '../models/user';

class UserController {
	async create(req: Request, res: Response) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array(), data: null });
		}

		try {
			const { name, phone, email } = req.body;
			
			let user: (IUser | null) = await User.findOne({ email });

			if (user) {
				return res.status(HttpStatusCodes.CONFLICT).json({
					errors: [
						{
							msg: 'User already exists!'
						}
					],
					data: null
				});
			}

			const userFields = {
				name,
				phone,
				email
			};

			user = new User(userFields);

			await user.save();

			res.status(HttpStatusCodes.CREATED).json({ errors: null, data: user });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

	async findAll(_req: Request, res: Response) {
		try {
			const users: IUser[] = await User.find();

			res.json({ errors: null, data: users });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

	async findOne(req: Request, res: Response) {
		const userID: string = req.params['id'];

		try {
			const user: IUser | null = await User.findById(userID);

			res.json({ errors: null, data: user });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

	async update(req: Request, res: Response) {
		const userID: string = req.params['id'];

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array(), data: null });
		}

		try {
			const data = req.body;

			await User.findOneAndUpdate(
				{ _id: userID },
				{ $set: data },
				{ new: true }
			)
				.then(user => res.json({ errors: null, data: user }))
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
		const userID: string = req.params['id'];

		try {
			await User.findByIdAndRemove(userID);

			res.json({ errors: null, data: 'User successful removed!' });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}
}

export default new UserController();
