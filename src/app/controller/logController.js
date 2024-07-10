import {
	buildError,
	status
} from '../helper/status';

import { getLog } from '../util/log';

const log = getLog('logController');

export const print = async (req, res) => {
	let { content } = req.body;
	log('print', { content });
	try {
		return res.status(status.success).send('');
	} catch (error) {
		return buildError(log, 'print', error, res);
	}
};
