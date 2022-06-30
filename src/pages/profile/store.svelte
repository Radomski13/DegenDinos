<script>
    import Card from "../../components/Card.svelte";
    import { storeWallet } from "../../stores/store";
    import WalletSignatureCheck from "../../components/WalletSignatureCheck.svelte";
    import { isConnected, getWallet, verifySignature } from "../../utils/web3";

    $: connected = null;
    $: wallet = null;
    $: orders = null;

    const retrieveInitialInfo = async () => {
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

                orders = $storeWallet.orders;
            }
        }
    }
    retrieveInitialInfo();

</script>

<Card>
    <div>Store Account Info</div>
    <a style="font-size:10px;display:inline-block;margin-bottom:10px" href="#" on:click={() => history.back()}>⇠ Go Back</a>

    <WalletSignatureCheck>
    <div class="mt-5">
      <a href="/profile/address">Update Shipping Address</a>
      {#if orders?.length}
      <br /><br />
      Orders:<br />
      {#each orders as order}
      - <a href="/store/order/{order.id}">Order #{order.id}</a><br />
      {/each}
      {/if}
      
    </div>
    </WalletSignatureCheck>
</Card>

<style>
    p {
        line-height: 1.3rem;
        font-family: "Roboto",sans-serif;
        margin-bottom:10px;
    }
    a {
        text-decoration: underline;
    }
    a:hover { opacity:0.9}
</style>