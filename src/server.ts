require('dotenv-expand')(require('dotenv').config());

import chalk from 'chalk';
import { app, log } from './app';

const port = process.env.PORT;

app.listen(port, () => log(`Server running on port: ${chalk.green(port)}`));
