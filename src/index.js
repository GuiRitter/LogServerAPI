import '@babel/polyfill'; // always first import
import 'dotenv/config'; // always second import
import "reflect-metadata"; // always third import
import express from 'express';
import cors from 'cors';

import logRoute from './app/route/logRoute';

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', logRoute);

app.listen(process.env.PORT, '127.0.0.1').on('listening', () => {
	console.log(`${(new Date()).toISOString()} are live on ${process.env.PORT}`);
});

// broker

require('./app/config/broker.js').init();

export default app;
