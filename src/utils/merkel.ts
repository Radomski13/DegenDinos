import { CROAKENS_ADDRESS, CROAKENS_ABI } from "./constants";
import { Buffer } from 'buffer'
globalThis.Buffer = Buffer

import { getWeb3 } from "./web3";
import config from "../merkel/config.json";

const web3 = getWeb3();
const token = web3 ? new web3.eth.Contract(CROAKENS_ABI, CROAKENS_ADDRESS) : null;

/**
 * Generate Merkle Tree leaf from address and value
 * @param {string} address of airdrop claimee
 * @param {string} value of airdrop tokens to claimee
 * @returns {Buffer} Merkle Tree node
 */
const generateLeaf = (address: string, value: string): Buffer => {
  try {
    return Buffer.from(
      // Hash in appropriate Merkle format
      web3.utils
        .soliditySha3(address, value)
        .slice(2),
      "hex"
    );
  }
  catch {
    return "";
  }
}

// Setup merkle tree
const merkleTree = new window.MerkleTree(
  // Generate leafs
  Object.entries(config.airdrop).map(([address, tokens]) =>
    generateLeaf(
      address.toLowerCase(),
      web3?.utils.toWei(tokens.toString(), 'ether').toString()
    )
  ),
  // Hashing function
  window.keccak256,
  { sortPairs: true }
);

/**
   * Collects number of tokens claimable by a user from Merkle tree
   * @param {string} address to check
   * @returns {number} of tokens claimable
   */
 export const getAirdropAmount = (address: string): number => {
  // If address is in airdrop. convert address to correct checksum
  address = address.toLowerCase();
  
  if (address in config.airdrop) {
    // Return number of tokens available
    return config.airdrop[address];
  }

  // Else, return 0 tokens
  return 0;
};

 /**
 * Collects claim status for an address
 * @param {string} address to check
 * @returns {Promise<boolean>} true if already claimed, false if available
 */
export const getClaimedStatus = async (address: string): Promise<boolean> => {
  // Return claimed status
  return await token.methods.hasClaimed(address).call();
};


export const getAirDropClaimData = async (address: string) => {
  // If not authenticated throw
  if (!address) {
    throw new Error("Not Authenticated");
  }

  // Get properly formatted address
  const formattedAddress: string = address.toLowerCase();

  // Get tokens for address
  const numTokens: string = web3.utils
    .toWei(config.airdrop[address.toLowerCase()].toString(), 'ether')
    .toString();

  // Generate hashed leaf from address
  const leaf: Buffer = generateLeaf(formattedAddress, numTokens);
  // Generate airdrop proof
  const proof: string[] = merkleTree.getHexProof(leaf);

  return { formattedAddress, numTokens, proof };

};
