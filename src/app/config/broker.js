import { messagebroker } from '@morgan-stanley/message-broker';

let channelMap = {};

module.exports = {
	init: channelName => {
		const broker = messagebroker();

		channelMap[channelName] = broker.create(channelName);

		return channelMap[channelName];
	},

	get: channelName => {
		if (!channelMap[channelName]) {
			throw new Error("The message broker channel is not initialized.");
		}
		return channelMap[channelName];
	},
};

// broker.create('myChannel').publish({
//     payload: 'My first message using the MessageBroker!',
// });

// broker.get('myChannel').subscribe(message => {
//     console.log(message.payload);
// });
