import { writable } from 'svelte/store';

function createTransactionStatus() {

    const defaultObj = {
        title: "PENDING",
        message: "TRANSACTION IS PENDING, CLOSING THIS WINDOW WILL NOT CANCEL THE TRANSACTION",
        buttonText: "OKAY!",
    }

	const { subscribe, set, update } = writable(defaultObj);
    

	return {
		subscribe,
        setTitle: (title) => update(obj => {
            return {
                ...obj,
                title
            }
        }),
		setMessage: (message) => update(obj => {
            return {
                ...obj,
                message
            }
        }),
		setButtonText: (butonText) => update(obj => {
            return {
                ...obj,
                butonText
            }
        }),
        setTx: (tx) => update(obj => {
            return {
                ...obj,
                tx
            }
        }),
		reset: () => set(defaultObj)
	};
}

export const transactionStatus = createTransactionStatus();