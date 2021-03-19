import { Router } from 'express';

const route = Router();

route.get('/', (_req, res) => {
  return res.send('Hello from All!!!');
});

export default route;
