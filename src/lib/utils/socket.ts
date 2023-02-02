import { socket } from '$lib/socketio/socket';
import { messagesStore } from '$lib/store/chat';

export const sendMessage = (
	payload: { sender: any; body: string; room: any },
	callback?: () => void
) => {
	socket.emit('send-message', payload, (res: never) => {
		// @ts-ignore
		res.new = true;
		messagesStore.update((val) => [...val, res]);
	});

	if (callback) {
		callback();
	}
};
