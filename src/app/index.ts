import { json, urlencoded } from 'body-parser';
import chalk from 'chalk';
import debug, { Debugger } from 'debug';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import db from '../config/db.config';
import routes from '../routes';

class TFApplication {
	app: Application;
	log: Debugger;

	constructor() {
		this.app = express();
		this.log = debug('api:main');

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
			.then(() => this.log(`DATABASE: [${chalk.green('online')}]`))
			.catch(() => {
				this.log(`DATABASE: [${chalk.red('offline')}]`);

				process.exit(1);
			});
	}

	_applyMiddlewares() {
		this.app.use(json());
		this.app.use(urlencoded({ extended: false }));

		this.app.use((req, _res, next) => {
			this.log(
				`${req.method} ${req.url} - request at: ${new Date().toISOString()}`
			);
			return next();
		});

		this.app.use(routes);
	}
}

const { app, log } = new TFApplication();

export { app, log };
