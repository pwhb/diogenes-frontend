import { messagesStore } from '$lib/store/chat';
import { gameMessagesStore, gameState, } from '$lib/store/game';
import ioClient from 'socket.io-client';

export const socket = ioClient(import.meta.env.VITE_SOCKET_SERVER_URL);

socket.on('receive-message', (message) => {
    message.new = true;
    console.log("receive", message)
    if (message.inGame) {
        gameMessagesStore.update((val) => [...val, message as never])
    } else {
        messagesStore.update((val) => [...val, message as never]);
    }


});

socket.on('update-state', (state) => {

    console.log("receive", state)
    gameState.set(state)
});