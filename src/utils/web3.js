let web3;
// @ts-ignore
if (window.ethereum) {
    // @ts-ignore
    web3 = new window.Web3(window.ethereum);
// @ts-ignore
} else if (window.web3) {
    // @ts-ignore
    web3 = new window.Web3(window.web3.currentProvider);
}

export const getWeb3 = () => web3;

const getAccounts = async () => {
    try { return await web3.eth.getAccounts(); }
    catch { return null }
}

export const verifyWallet = async () => {
    try { 
        const wallet = await getWallet();
        return await web3.eth.personal.sign("Swampverse is verifying that you own this wallet.", wallet); 
    }
    catch(err) { 
        console.log(err);
        return null }
}

export const verifySignature = async (signature, wallet) => {
    const signatureWallet = await web3.eth.accounts.recover("Swampverse is verifying that you own this wallet.", signature);
    return wallet.toLowerCase() === signatureWallet.toLowerCase();
}

export const connect = async () => {
    try {
        // @ts-ignore
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    catch { return; }
}

export const isConnected = async () => {
    try {
        const accounts = await getAccounts();
        if(accounts.length) return true;
        return false;
    }
    catch { return false }
}

export const getWallet = async () => {
    if(isConnected) {
        const accounts = await getAccounts();
        return accounts[0];
    }
    return null;
}

export const truncateWallet = (wallet) => {
    wallet = String(wallet)
    if (wallet.length <= 15) return wallet;
    return wallet.substr(0, 2) + "..." + wallet.substr(wallet.length - 4);
}


export const truncateDecimals = (number, digits)  => {
    const multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
}