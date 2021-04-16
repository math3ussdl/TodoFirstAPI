import { NextFunction, Request, Response } from 'express';
import { Debugger } from 'debug';

export default function loggingMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
	log: Debugger
) {
	log(
		`${req.method} ${
			req.url
		} - ${res.statusCode?.toString()} - request at: ${new Date().toISOString()}`
	);

	next();
}
