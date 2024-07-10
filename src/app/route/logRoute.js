import express from 'express';

import { print } from '../controller/logController';

const router = express.Router();

router.post('/', print);

export default router;
