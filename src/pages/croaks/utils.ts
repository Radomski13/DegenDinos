import { CROAKENS_ADDRESS, CROAKENS_ABI, STORE_ADDRESS, BASE } from "../../utils/constants";
import { getWeb3 } from "../../utils/web3";
import { transactionStatus } from "./store";
import { getAirDropClaimData } from "../../utils/merkel";

const web3 = getWeb3();
const contract = web3 ? new web3.eth.Contract(CROAKENS_ABI, CROAKENS_ADDRESS) : null;

export const getTotalSupply = async () => {
    try {
        const total = (await contract.methods.totalSupply().call())/BASE;
        return total;
    }
    catch {
        return 0;
    }
}

export const getClaimable = async (address) => {
    try {
        const claimable = (await contract.methods.getClaimable(address).call())/BASE;
        return Math.floor(claimable * 100) / 100;
    }
    catch {
        return 0;
    }
}

export const getBalance = async (address) => {
    try {
        const balance = (await contract.methods.balanceOf(address).call())/BASE;
        return Math.floor(balance * 100) / 100;
    }
    catch {
        return 0;
    }
}

export const approve = async (spender, from, amount) => {
    try{
        const tx = await contract.methods.approve(spender, amount).send({ from });
        return tx.transactionHash;
    }
    catch(err) {
        return null;
    }
}

export const getAllowance = async (owner, spender) => {
    try{
        const allowance = await contract.methods.allowance(owner,spender).call();
        return allowance;
    }
    catch(err) {
        return null;
    }
}

export const claim = async (address) => {
    try{
        const { formattedAddress, numTokens, proof } = await getAirDropClaimData(address);
        const tx = await contract.methods.claim(formattedAddress, numTokens, proof).send({ from: address });
        transactionStatus.setTitle('Success!');
        transactionStatus.setMessage('Please wait for transaction to complete and then update the page.');
        transactionStatus.setTx(tx.transactionHash);
    }
    catch(err) {
        if (err.code === 4001)
            transactionStatus.setMessage("User denied the transaction");
        else if (err.message.includes('Caller not allowed')) 
            transactionStatus.setMessage("Cannot claim another wallets $CROAKS");
        else if (err.code === 'INSUFFICIENT_FUNDS') 
            transactionStatus.setMessage("Wallet does not have the sufficient funds.");
        else if (err.message.includes('underlying network changed')) 
            transactionStatus.setMessage("Connected to the wrong network, please connect to Mainnet");
        else if (err.code === 'UNPREDICTABLE_GAS_LIMIT') 
            transactionStatus.setMessage("Unable to calculate gas limit, please try again.");
        else
            transactionStatus.setMessage("Wallet not connected. Please connect your wallet.");

        return;
    }
}

export const payStore = async (address, amount) => {
    try {
        const transfer = await contract.methods.transfer(STORE_ADDRESS, web3.utils.toWei(amount.toString())).send({ from: address });
        return transfer.transactionHash;
    }
    catch(err) {
        return null;
    }
}