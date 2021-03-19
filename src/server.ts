import chalk from 'chalk';
import env from 'dotenv';
import expand from 'dotenv-expand';

import app from './app';

const enviroment = env.config();
expand(enviroment);

const port = process.env.PORT;

app.listen(port, () =>
	console.log(
		`--------------------------\nSERVER: [${chalk.green('online')}]
    \nPORT: ${chalk.magenta(port)}\nURL: ${chalk.magenta(
			process.env.BASE_URL
		)}\n--------------------------`
	)
);
