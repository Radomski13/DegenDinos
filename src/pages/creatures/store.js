import { writable } from 'svelte/store';

function createTransactionStatus() {

    const defaultObj = {
        message: null,
        tx: null,
        tx_complete: false,
        isModalVisible: false
    }

	const { subscribe, set, update } = writable(defaultObj);

	return {
		subscribe,
        setStatus: (status) => update(obj => {
            return {
                ...obj,
                status
            }
        }),
		setMessage: (message) => update(obj => {
            return {
                ...obj,
                message
            }
        }),
        setTx: (tx) => update(obj => {
            return {
                ...obj,
                tx
            }
        }),
        setTxComplete: (tx_complete) => update(obj => {
            return {
                ...obj,
                tx_complete
            }
        }),
        setModal: (isModalVisible) => update(obj => {
            return {
                ...obj,
                isModalVisible
            }
        }),
		reset: () => set(defaultObj)
	};
}

function createApprovalStatus() {

    const defaultObj = {
        pending: false,
        message: null,
        isModalVisible: false
    }

    const { subscribe, set, update } = writable(defaultObj);

    return {
        subscribe,
        setPending: (pending) => update(obj => {
            return {
                ...obj,
                pending
            }
        }),
        setMessage: (message) => update(obj => {
            return {
                ...obj,
                message
            }
        }),
        setModal: (isModalVisible) => update(obj => {
            return {
                ...obj,
                isModalVisible
            }
        }),
        reset: () => set(defaultObj)
    };
}

export const creatureTransaction = createTransactionStatus();
export const approvalTransaction = createApprovalStatus();