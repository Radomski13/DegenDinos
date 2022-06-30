import { writable } from 'svelte/store';

function createStoreWallet() {

    const defaultObj = {
        address: null,
        orders: null,
        walletSignature: null
    }

	const { subscribe, set, update } = writable(defaultObj);
    

	return {
		subscribe,
        setAddress: (address) => update(obj => {
            return {
                ...obj,
                address
            }
        }),
		setOrders: (orders) => update(obj => {
            return {
                ...obj,
                orders
            }
        }),
		setWalletSignature: (walletSignature) => update(obj => {
            if(walletSignature) {
                localStorage.setItem('signature', walletSignature);
                return {
                    ...obj,
                    walletSignature
                }
            }
            return obj;
        }),
		reset: () => {
            localStorage.clear();
            set(defaultObj)
        }
	};
}

export const storeWallet = createStoreWallet();