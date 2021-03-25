import { Router } from 'express';
import { check } from 'express-validator';
import CategoryController from './app/controllers/CategoryController';
import ListController from './app/controllers/ListController';
import StatusController from './app/controllers/StatusController';
import TaskController from './app/controllers/TaskController';

import UserController from './app/controllers/UserController';

const route = Router();

route.get('/api', (_req, res) => {
	return res.send('Hello from All!!!');
});

/* User Routes */

/**
 * @route  POST api/users
 * @desc   Register user given their credentials
 * @access Public
 */
route.post(
	'/api/users',
	[
		check('name', 'Please enter a name with 4 or more characters!').isLength({
			min: 4
		}),
		check('phone', 'Please enter a valid mobile phone!').isMobilePhone('pt-BR'),
		check('email', 'Please include a valid email!').isEmail()
	],
	UserController.create
);

/**
 * @route  GET api/users
 * @desc   Returns a User list
 * @access Public
 */
route.get('/api/users', UserController.findAll);

/**
 * @route  GET api/users/:id
 * @desc   Returns a specific User
 * @access Public
 */
route.get('/api/users/:id', UserController.findOne);

/**
 * @route  PUT api/users/:id
 * @desc   Updates a specific user
 * @access Public
 */
route.put(
	'/api/users/:id',
	[
		check('name', 'Please enter a name with 4 or more characters!').isLength({
			min: 4
		}),
		check('phone', 'Please enter a valid mobile phone!').isMobilePhone('pt-BR'),
		check('email', 'Please include a valid email!').isEmail()
	],
	UserController.update
);

/**
 * @route  DELETE api/users/:id
 * @desc   Deletes a specific user
 * @access Public
 */
route.delete('/api/users/:id', UserController.delete);

/****************************************************/

/* Category Routes */

/**
 * @route  POST api/categories
 * @desc   Register category given their credentials
 * @access Public
 */
route.post(
	'/api/categories',
	[
		check(
			'description',
			'Please enter a description with 6 or more characters!'
		).isLength({ min: 6 })
	],
	CategoryController.create
);

/**
 * @route  GET api/categories
 * @desc   Returns a category list
 * @access Public
 */
route.get('/api/categories', CategoryController.findAll);

/**
 * @route  GET api/categories/:id
 * @desc   Returns a specific category
 * @access Public
 */
route.get('/api/categories/:id', CategoryController.findOne);

/**
 * @route  PUT api/categories/:id
 * @desc   Updates a specific category
 * @access Public
 */
route.put(
	'/api/categories/:id',
	[
		check(
			'description',
			'Please enter a description with 6 or more characters!'
		).isLength({ min: 6 })
	],
	CategoryController.update
);

/**
 * @route  DELETE api/categories/:id
 * @desc   Deletes a specific category
 * @access Public
 */
route.delete('/api/categories/:id', CategoryController.delete);

/****************************************************/

/* List Routes */

/**
 * @route  POST api/lists
 * @desc   Register list given their credentials
 * @access Public
 */
 route.post(
	'/api/lists',
	[
		check(
			'authorId',
			'Please enter a author id with 10 or more characters!'
		).isLength({ min: 10 }),
		check(
			'title',
			'Please enter a title with 4 or more characters!'
		).isLength({ min: 4 }),
		check(
			'description',
			'Please enter a description with 6 or more characters!'
		).isLength({ min: 6 }),
		check(
			'categoryId',
			'Please enter a category id with 10 or more characters!'
		).isLength({ min: 10 })
	],
	ListController.create
);

/**
 * @route  GET api/lists
 * @desc   Returns a list of Lists
 * @access Public
 */
route.get('/api/lists', ListController.findAll);

/**
 * @route  GET api/lists/:id
 * @desc   Returns a specific list
 * @access Public
 */
route.get('/api/lists/:id', ListController.findOne);

/**
 * @route  PUT api/lists/:id
 * @desc   Updates a specific list
 * @access Public
 */
route.put(
	'/api/lists/:id',
	[
		check(
			'authorId',
			'Please enter a author id with 10 or more characters!'
		).isLength({ min: 10 }),
		check(
			'title',
			'Please enter a title with 4 or more characters!'
		).isLength({ min: 4 }),
		check(
			'description',
			'Please enter a description with 6 or more characters!'
		).isLength({ min: 6 }),
		check(
			'categoryId',
			'Please enter a category id with 10 or more characters!'
		).isLength({ min: 10 })
	],
	ListController.update
);

/**
 * @route  DELETE api/lists/:id
 * @desc   Deletes a specific list
 * @access Public
 */
route.delete('/api/lists/:id', ListController.delete);

/****************************************************/

/* Status Routes */

/**
 * @route  POST api/statuses
 * @desc   Register a status given their credentials
 * @access Public
 */
 route.post(
	'/api/statuses',
	[
		check(
			'description',
			'Please enter a description with 5 or more characters!'
		).isLength({ min: 5 })
	],
	StatusController.create
);

/**
 * @route  GET api/statuses
 * @desc   Returns a list of statuses
 * @access Public
 */
route.get('/api/statuses', StatusController.findAll);

/**
 * @route  GET api/statuses/:id
 * @desc   Returns a specific status
 * @access Public
 */
route.get('/api/statuses/:id', StatusController.findOne);

/**
 * @route  PUT api/statuses/:id
 * @desc   Updates a specific status
 * @access Public
 */
route.put(
	'/api/statuses/:id',
	[
		check(
			'description',
			'Please enter a description with 5 or more characters!'
		).isLength({ min: 5 })
	],
	StatusController.update
);

/**
 * @route  DELETE api/statuses/:id
 * @desc   Deletes a specific status
 * @access Public
 */
route.delete('/api/statuses/:id', StatusController.delete);

/****************************************************/

/* Task Routes */

/**
 * @route  POST api/tasks
 * @desc   Register a task given their credentials
 * @access Public
 */
 route.post(
	'/api/tasks',
	[
		check(
			'listId',
			'Please enter a list id with 15 or more characters!'
		).isLength({ min: 15 }),
		check(
			'description',
			'Please enter a description with 6 or more characters!'
		).isLength({ min: 6 }),
		check(
			'dt_prev',
			'Please enter a valid Date!'
		).isDate({ format: 'DD-MM-YYYY' }),
		check(
			'dt_exec',
			'Please enter a valid Date!'
		).isDate({ format: 'DD-MM-YYYY' }),
		check(
			'responsibleId',
			'Please enter a responsible id with 15 or more characters!'
		).isLength({ min: 15 })
	],
	TaskController.create
);

/**
 * @route  GET api/tasks
 * @desc   Returns a list of tasks
 * @access Public
 */
route.get('/api/tasks', TaskController.findAll);

/**
 * @route  GET api/tasks/:id
 * @desc   Returns a specific task
 * @access Public
 */
route.get('/api/tasks/:id', TaskController.findOne);

/**
 * @route  PUT api/tasks/:id
 * @desc   Updates a specific task
 * @access Public
 */
route.put(
	'/api/tasks/:id',
	[
		check(
			'listId',
			'Please enter a list id with 15 or more characters!'
		).isLength({ min: 15 }),
		check(
			'description',
			'Please enter a description with 6 or more characters!'
		).isLength({ min: 6 }),
		check(
			'dt_prev',
			'Please enter a valid Date!'
		).isDate({ format: 'DD/MM/YYYY' }),
		check(
			'dt_exec',
			'Please enter a valid Date!'
		).isDate({ format: 'DD/MM/YYYY' }),
		check(
			'responsibleId',
			'Please enter a responsible id with 15 or more characters!'
		).isLength({ min: 15 })
	],
	TaskController.update
);

/**
 * @route  DELETE api/tasks/:id
 * @desc   Deletes a specific task
 * @access Public
 */
route.delete('/api/tasks/:id', TaskController.delete);

/****************************************************/

export default route;
