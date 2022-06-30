import { writable } from 'svelte/store';

function orderConfirmationTransaction() {

    const defaultObj = {
        title: "Pending",
        message: "DO NOT leave this page until the transaction is completed or your order will not be counted.",
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
		reset: () => set(defaultObj)
	};
}

export const transactionStatus = orderConfirmationTransaction();