import { CREATURES_ADDRESS, CREATURES_ABI, SWAMPER_ABI, SWAMPER_ADDRESS } from "../../utils/constants";
import { getWeb3 } from "../../utils/web3";
import { approve as approveCroak } from "../croaks/utils";
import { creatureTransaction } from "./store";

const web3 = getWeb3();
const contract = web3 ? new web3.eth.Contract(CREATURES_ABI, CREATURES_ADDRESS) : null;
const swamperContract = web3 ? new web3.eth.Contract(SWAMPER_ABI, SWAMPER_ADDRESS) : null;

export const getTotalSupply = async () => {
    try {
        const total = (await contract.methods.totalSupply().call());
        return Number(total);
    }
    catch {
        return 0;
    }
}

export const isMintOn = async () => (await contract.methods.mintingAllowed().call());

export const isSwampversApproved = async (wallet) => {
    try {
        const isApproved = await swamperContract.methods.isApprovedForAll(wallet, CREATURES_ADDRESS).call();
        return isApproved;
    }
    catch {
        return false;
    }
}

export const approveSwamper = async (wallet) => {
    try {
        const isApproved = await swamperContract.methods.setApprovalForAll(CREATURES_ADDRESS, true).send({ from: wallet });
        return isApproved.tx;
    }
    catch {
        return null;
    }
}

export const mintCreature = async (address, swamp1, swamp2) => {
    try {
        const tx = await contract.methods.mintCreature([swamp1, swamp2]).send({ from: address });
        creatureTransaction.setMessage('Please wait for transaction to complete and then refresh the page.');
        creatureTransaction.setTx(tx.transactionHash);
    }
    catch(err) {
        if (err.code === 4001)
            creatureTransaction.setMessage("User denied the transaction");
        else if (err.message.includes('Caller not allowed')) 
            creatureTransaction.setMessage("Cannot claim another wallets $CROAKS");
        else if (err.code === 'INSUFFICIENT_FUNDS') 
            creatureTransaction.setMessage("Wallet does not have the sufficient funds.");
        else if (err.message.includes('underlying network changed')) 
            creatureTransaction.setMessage("Connected to the wrong network, please connect to Mainnet");
        else if (err.code === 'UNPREDICTABLE_GAS_LIMIT') 
            creatureTransaction.setMessage("Unable to calculate gas limit, please try again.");
        else
            creatureTransaction.setMessage("Wallet not connected. Please connect your wallet.");

        return;
    }
}