import { writable } from "svelte/store";

export const gameMessagesStore = writable([])

export const unreadCount = writable(0)

export const gameState = writable({
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false,
    leftKissing: false,
    rightKissing: false
})