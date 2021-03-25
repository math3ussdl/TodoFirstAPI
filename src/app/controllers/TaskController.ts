import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import HttpStatusCodes from 'http-status-codes';

import Task, { ITask } from '../models/task';

class TaskController {
  async create(req: Request, res: Response) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array(), data: null });
		}

		try {
			const { listId, description, dt_prev, dt_exec, responsibleId } = req.body;
			
			let task: (ITask | null) = await Task.findOne({ description });

			if (task) {
				return res.status(HttpStatusCodes.CONFLICT).json({
					errors: [
						{
							msg: 'Task already exists!'
						}
					],
					data: null
				});
			}

			const taskFields = {
				list: listId,
        description,
        dt_prev,
        dt_exec,
        responsible: responsibleId
			};

			task = new Task(taskFields);

			await task.save();

			res.status(HttpStatusCodes.CREATED).json({ errors: null, data: task });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

  async findAll(_req: Request, res: Response) {
		try {
			const tasks: ITask[] = await Task.find();

			res.json({ errors: null, data: tasks });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

  async findOne(req: Request, res: Response) {
		const taskID: string = req.params['id'];

		try {
			const task: ITask | null = await Task.findById(taskID);

			res.json({ errors: null, data: task });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}

  async update(req: Request, res: Response) {
		const taskID: string = req.params['id'];

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array(), data: null });
		}

		try {
			const data = req.body;

			await Task.findOneAndUpdate(
				{ _id: taskID },
				{ $set: data },
				{ new: true }
			)
				.then(task => res.json({ errors: null, data: task }))
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
		const taskID: string = req.params['id'];

		try {
			await Task.findByIdAndRemove(taskID);

			res.json({ errors: null, data: 'Task successful removed!' });
		} catch (err) {
			console.error(err.message);
			res
				.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
				.json({ errors: [{ msg: 'Internal Server Error!' }], data: null });
		}
	}
}

export default new TaskController();
