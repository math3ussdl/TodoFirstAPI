import chalk from 'chalk';
import env from 'dotenv';
import expand from 'dotenv-expand';

import { app, log } from './app'

const enviroment = env.config();
expand(enviroment);

const port = process.env.PORT;

app.listen(port, () => log(`Server running on port: ${chalk.green(port)}`));
