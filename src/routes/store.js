import {writable} from 'svelte/store';

// Create a writable store with an initial value
export const storeAccount = writable('');
export const storeConnected = writable(false);
export const storeNetwork = writable(0);
export const storeEth = writable(0);
