/* eslint-disable @typescript-eslint/no-explicit-any */
import { socket } from '$lib/socketio/socket';
import type { ObjectId } from 'mongoose';

import type { Writable } from 'svelte/store';

export const sendMessage = (
	payload: { sender: ObjectId; body?: string; room: ObjectId; type?: string; game?: any, inGame?: boolean },
	store: Writable<never[]>
) => {
	socket.emit('send-message', payload, (res: any) => {
		res.new = true;
		console.log("send", res)
		store.update((val) => [...val, res as never]);
	});
};

export const seeMessage = (messageId: ObjectId, seenBy: ObjectId) => {
	socket.emit("update-message", { messageId, seenBy }, (res: any) => {
		console.log("update-message", res);
	})
}