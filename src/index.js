import 'babel-polyfill';
import cors from 'cors';
import 'dotenv/config'; // always first import
import express from 'express';

import logRoute from './app/route/logRoute';
import { getLog } from './app/util/log';

const log = getLog('index');

// TODO I think that this is what I need: https://github.com/pcan/node-stomp-protocol
var stomp = require('stomp');

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', logRoute);

// STOMP

// Set to true if you want a receipt
// of all messages sent.
const receipt = true;

// Set debug to true for more verbose output.
// login and passcode are optional (required by rabbitMQ)
const stomp_args = {
    port: 51091,
    // host: 'guilherme-alan-ritter.net',
    host: 'localhost',
    debug: true,
    // login: 'guest',
    // passcode: 'guest',
}

const client = new stomp.Stomp(stomp_args);

client.connect();

client.on('connected', () => {
	log('client connected');
	client.disconnect();
});

client.on('receipt', receipt => {
	log('receipt received');
});

client.on('error', function(error_frame) {
    console.log(error_frame.body);
    client.disconnect();
});

process.on('SIGINT', () => {
	log('received SIGINT');
	client.disconnect();
	process.exit(0);
});

// back to Express

app.listen(process.env.PORT, '127.0.0.1').on('listening', () => {
	console.log(`${(new Date()).toISOString()} are live on ${process.env.PORT}`);
});

export default app;
