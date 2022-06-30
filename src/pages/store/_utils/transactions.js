import {
  CROAKENS_ADDRESS,
  CROAKENS_ABI,
  STORE_ADDRESS,
} from '../../../utils/constants'
import { getWeb3 } from '../../../utils/web3'

const web3 = getWeb3()
const croaksContract = web3
  ? new web3.eth.Contract(CROAKENS_ABI, CROAKENS_ADDRESS)
  : null

export const purchase = async (amount, from, signature, order_number) => {
  try {
    croaksContract.methods
      .transfer(STORE_ADDRESS, web3.utils.toWei(amount.toString()))
      .send({ from })
      .once('transactionHash', async (purchase_tx) => {
        await fetch('https://api.swamps.io/store/purchase', {
          method: 'POST',
          headers: {
            'X-API-KEY': signature,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order_number, purchase_tx }),
        })

        window.location.reload()
      })
  } catch (err) {
    console.log(err)
    return null
  }
}

export const payShipping = async (amount, from, signature, order_number) => {
  try {
    web3.eth
      .sendTransaction({
        from,
        to: STORE_ADDRESS,
        value: web3.utils.toWei(amount.toString()),
      })
      .once('transactionHash', async (shipping_tx) => {
        await fetch('https://api.swamps.io/store/ship', {
          method: 'POST',
          headers: {
            'X-API-KEY': signature,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order_number, shipping_tx }),
        })

        window.location.reload()
      })
  } catch (err) {
    console.log(err)
    return null
  }
}
