import { writable } from "svelte/store";

export const gameMessagesStore = writable([])

export const unreadCount = writable(0)

export const gameState = writable()