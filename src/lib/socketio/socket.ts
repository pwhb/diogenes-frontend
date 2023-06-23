
import { PUBLIC_SOCKET_SERVER_URL } from '$env/static/public';
import SocketEvents from '$lib/consts/SocketEvents';
import { messagesStore, typingUser } from '$lib/store/chat';
import { gameMessagesStore, gameState, unreadCount, } from '$lib/store/game';
import ioClient from 'socket.io-client';

export const socket = ioClient(PUBLIC_SOCKET_SERVER_URL);

socket.on('receive-message', (message: any) =>
{
    const sound = new Audio("/sounds/smile-ringtone.mp3");
    sound.play();

    message.new = true;
    console.log("receive", message);
    if (message.inGame)
    {
        unreadCount.update(val => val + 1);
        gameMessagesStore.update((val) => [...val, message as never]);
    } else
    {
        navigator.vibrate(100);
        messagesStore.update((val) => [...val, message as never]);
    }


});

socket.on('update-state', (state: any) =>
{
    console.log("receive", state);
    gameState.set(state);
});

socket.on(SocketEvents.OnStartTyping, (username: any) =>
{
    console.log("on start typing");
    typingUser.set(username);
});

socket.on(SocketEvents.OnStopTyping, (username: any) =>
{
    console.log("on stop typing");

    typingUser.set("");
});