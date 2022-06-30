<script>
  import { storeWallet } from "../../../stores/store";
  import { isConnected, verifySignature, getWallet } from "../../../utils/web3";

  $: connected = null;
  $: wallet = null;
  $: orders = null;

  const setInitialData = async () => {
      connected = await isConnected();

      if(connected) {
          const localStorageSignature = await localStorage.getItem("signature");
          if(localStorageSignature) storeWallet.setWalletSignature(localStorageSignature);
          wallet = await getWallet();

          //verify that the wallet signature equals current wallet
          if($storeWallet.walletSignature) {
              const verifySignatureVsWallet = await verifySignature($storeWallet.walletSignature, wallet);
              if(!verifySignatureVsWallet) storeWallet.reset();
          }

          if($storeWallet.walletSignature) {
              const getAccount = await (await fetch("https://api.swamps.io/account", { method: 'GET', headers: { "X-API-KEY": $storeWallet.walletSignature } })).json();
              storeWallet.setAddress(getAccount.address);
              storeWallet.setOrders(getAccount.orders);
              orders = getAccount.orders;
          }
      }
  }
  setInitialData();
</script>

{#if orders?.length > 0}
<a href="/profile/store">View recent orders</a>
{/if}

<style>
  a {
    display:block;
    font-family: 'Press Start 2P',Arial;
    text-align:center;
    font-size:10px;
    padding:10px;
    background-color:#479CDE;
    color:#fff;
  }
</style>