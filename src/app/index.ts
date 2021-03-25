import { json, urlencoded } from 'body-parser';
import chalk from 'chalk';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import db from '../config/db.config';
import routes from '../routes';

class TFApplication {
	app: Application;

	constructor() {
		this.app = express();

		this._dbConnect();
		this._applyMiddlewares();
	}

	async _dbConnect() {
		await mongoose
			.connect(db.uri!, {
				useCreateIndex: true,
				useFindAndModify: false,
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
			.then(() => console.log(`DATABASE: [${chalk.green('online')}]`))
			.catch(err => {
				console.log(`DATABASE: [${chalk.red('offline')}]`);
				console.error(err);

				process.exit(1);
			})
			.finally(() => console.log('--------------------------'));
	}

	_applyMiddlewares() {
		this.app.use(json());
		this.app.use(urlencoded({ extended: false }));
		this.app.use(morgan('dev'));
		this.app.use(routes);
	}
}

export default new TFApplication().app;
