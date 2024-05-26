import {writable} from 'svelte/store';

// Create a writable store with an initial value
export const storeSigner = writable(null);
export const storeConnected = writable(false);
export const storeNetwork = writable(0);
export const storeEth = writable(0);
export const storeFee = writable(0);
export const storeFeeToken = writable(0);
export const storeFeeTokenSymbol = writable("");
