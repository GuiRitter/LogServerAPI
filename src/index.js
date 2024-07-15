import 'dotenv/config'; // always first import
import express from 'express';
import 'babel-polyfill';
import cors from 'cors';

import { StompHeaders, StompError, StompClientCommandListener, createStompServerSession } from 'stomp-protocol';
import { Socket, createServer } from 'net';

import logRoute from './app/route/logRoute';
import { getLog } from './app/util/log';

const log = getLog('index');

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', logRoute);

// STOMP

function testServer(socket) { // 1) create a listener for incoming raw TCP connections.

    const listener = { // 2) define a listener for client-sent frames.

        connect(headers) {
            console.log('Connect!', headers);
            if (headers && headers.login === 'user' && headers.passcode === 'pass') {
                server.connected({ version: '1.2', server: 'MyServer/1.8.2' }).catch(console.error);
            } else {
                server.error({ message: 'Invalid login data' }, 'Invalid login data').catch(console.error);
            }
        },
        send(headers, body) {
            console.log('Send!', body, headers);
        },
        subscribe(headers) {
            console.log('subscription done to ' + (headers && headers.destination));
        },
        unsubscribe(headers) {
            console.log('unsubscribe', headers);
        },
        begin(headers) {
            console.log('begin', headers);
        },
        commit(headers) {
            console.log('commit', headers);
        },
        abort(headers) {
            console.log('abort', headers);
        },
        ack(headers) {
            console.log('ack', headers);
        },
        nack(headers) {
            console.log('nack', headers);
        },
        disconnect(headers) {
            console.log('Disconnect!', headers);
        },
        onProtocolError(error) {
            console.log('Protocol error!', error);
        },
        onEnd() {
            console.log('End!');
        }
    };

    const server = createStompServerSession(socket, listener);  // 3) Start a STOMP Session over the TCP socket.
}

const server = createServer(testServer); // 4) Create a TCP server

server.listen(51091, '127.0.0.1'); // 5) Listen for incoming connections

// back to Express

app.listen(process.env.PORT, '127.0.0.1').on('listening', () => {
	console.log(`${(new Date()).toISOString()} are live on ${process.env.PORT}`);
});

export default app;
