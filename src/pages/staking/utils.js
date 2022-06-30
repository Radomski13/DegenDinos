import { STAKING_ADDRESS, STAKING_ABI, SWAMPER_ADDRESS, SWAMPER_ABI, CREATURES_ADDRESS, CREATURES_ABI, BASE } from "../../utils/constants";
import { getWeb3 } from "../../utils/web3";
import { transaction, setTransactionError } from "../../stores/transaction";

const web3 = getWeb3();
const stakingContract = web3 ? new web3.eth.Contract(STAKING_ABI, STAKING_ADDRESS) : null;
const swamperContract = web3 ? new web3.eth.Contract(SWAMPER_ABI, SWAMPER_ADDRESS) : null;
const creatureContract = web3 ? new web3.eth.Contract(CREATURES_ABI, CREATURES_ADDRESS) : null;

export const getUserInfo = async (wallet) => await stakingContract.methods.userInfo(wallet).call();

export const getClaimableCroak = async (wallet) => await stakingContract.methods.pending(wallet).call();
export const getStakedNftCount = async (wallet) => await stakingContract.methods.balanceOf(wallet).call();

export const getSwamperRewardPerDay = async () => Number(await stakingContract.methods.swamperRewardPerDay().call());
export const getCreatureRewardPerDay = async () => Number(await stakingContract.methods.creatureRewardPerDay().call());

export const getUnstakedSwampers = async (wallet) => Number(await swamperContract.methods.balanceOf(wallet).call())
export const getUnstakedCreatures = async (wallet) => Number(await creatureContract.methods.balanceOf(wallet).call())

export const getStakedSwamperIds = async (wallet) => await stakingContract.methods.stakedSwampersByOwner(wallet).call();
export const getStakedCreatureIds = async (wallet) => await stakingContract.methods.stakedCreaturesByOwner(wallet).call();

export const isSwampersApproved = async (wallet) => await swamperContract.methods.isApprovedForAll(wallet, STAKING_ADDRESS).call();
export const isCreaturesApproved = async (wallet) => await creatureContract.methods.isApprovedForAll(wallet, STAKING_ADDRESS).call();

export const getPercentSwamperStaked = async () => {

  const stakedSwampers = await swamperContract.methods.balanceOf(STAKING_ADDRESS).call();
  const stakedCreatures = await creatureContract.methods.balanceOf(STAKING_ADDRESS).call();

  const burnedSwampers = await swamperContract.methods.balanceOf("0x000000000000000000000000000000000000dEaD").call();
  const totalSwampers = (await swamperContract.methods.totalSupply().call()) - burnedSwampers;
  const totalCreatures = await creatureContract.methods.totalSupply().call();

  return {
    swampersCount: stakedSwampers,
    creaturesCount: stakedCreatures,
    swampersPercent: (stakedSwampers/totalSwampers)*100,
    creaturesPercent: (stakedCreatures/totalCreatures)*100
  }
}

export const approveSwamperContract = async (wallet) => {
  try {
    transaction.setData('Setting approval', 'Transaction pending. Refresh page when finished.', true);
    const tx = await swamperContract.methods.setApprovalForAll(STAKING_ADDRESS, true).send({ from: wallet, maxPriorityFeePerGas: null, maxFeePerGas: null });
    transaction.setTx(tx.transactionHash);
  }
  catch(err) {
    setTransactionError(err);
    return;
  }
}

export const approveCreaturesContract = async (wallet) => {
  try {
    transaction.setData('Setting Approval', 'Transaction pending. Refresh page when finished.', true);
    const tx = await creatureContract.methods.setApprovalForAll(STAKING_ADDRESS, true).send({ from: wallet, maxPriorityFeePerGas: null, maxFeePerGas: null });
    transaction.setTx(tx.transactionHash);
  }
  catch(err) {
    setTransactionError(err);
    return;
  }
}

export const getReward = async (from) => {
  try {
    transaction.setData('Claiming', 'Transaction pending. Refresh page when finished.', true);
    const tx = await stakingContract.methods.getReward().send({ from, maxPriorityFeePerGas: null, maxFeePerGas: null });
    transaction.setTx(tx.transactionHash);
  }
  catch(err) {
    setTransactionError(err);
    return;
  }
}

export const stakeSwampers = async (ids = [], from) => {
  try {
    transaction.setData('Staking', 'Wait for transaction to complete and then refresh.', true);
    const tx = await stakingContract.methods.stakeSwampers(ids).send({ from, maxPriorityFeePerGas: null, maxFeePerGas: null });
    transaction.setTx(tx.transactionHash);
  }
  catch(err) {
    setTransactionError(err);
    return;
  }
}

export const stakeCreatures = async (ids = [], from) => {
  try {
    transaction.setData('Staking', 'Wait for transaction to complete and then refresh the page.', true);
    const tx = await stakingContract.methods.stakeCreatures(ids).send({ from, maxPriorityFeePerGas: null, maxFeePerGas: null });
    transaction.setTx(tx.transactionHash);
  }
  catch(err) {
    setTransactionError(err);
    return;
  }
}

export const withdrawSwampers = async (ids = [], from) => {
  try {
    transaction.setData('Un-Staking', 'Wait for transaction to complete and then refresh.', true);
    const tx = await stakingContract.methods.withdrawSwampers(ids).send({ from, maxPriorityFeePerGas: null, maxFeePerGas: null  });
    transaction.setTx(tx.transactionHash);
  }
  catch(err) {
    setTransactionError(err);
    return;
  }
}

export const withdrawCreatures = async (ids = [], from) => {
  try {
    transaction.setData('Un-Staking', 'Wait for transaction to complete and then refresh the page.', true);
    const tx = await stakingContract.methods.withdrawCreatures(ids).send({ from, maxPriorityFeePerGas: null, maxFeePerGas: null });
    transaction.setTx(tx.transactionHash);
  }
  catch(err) {
    console.log(err);
    setTransactionError(err);
    return;
  }
}