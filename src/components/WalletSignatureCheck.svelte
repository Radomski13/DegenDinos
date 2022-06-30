
<script>
    import { connect, isConnected, getWallet, verifyWallet, verifySignature } from "../utils/web3";
    import { storeWallet } from "../stores/store";
    import Error from "./Error.svelte";

    $: connected = null;
    $: wallet = null;
    $: loadingStoreWallet = true;

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
                loadingStoreWallet = false; 
            }
        }
    }
    setInitialData();

    const verify = async () => {
        const signature = await verifyWallet();
        storeWallet.setWalletSignature(signature);
        window.location.reload();
    }
</script>

{#if connected !== null}
    {#if connected === false}
        <Error><span on:click={() => connect()}>Connect</span> your wallet to continue.</Error>
    {:else}
        {#if !$storeWallet.walletSignature}
        <Error>
            First, verfiy your wallet.
            <div class="text-center"><button on:click={() => verify()}>Click Me</button></div>
        </Error>
        {:else if loadingStoreWallet}
        &nbsp;
        {:else}
        <slot />
        {/if}
    {/if}
{/if}

<style>
    span {
        cursor:pointer;
        text-decoration: underline;
    }
    button {
        text-decoration: underline;
        display: inline-block;
        cursor: pointer;
        text-align: center;
        margin-top:15px;
    }
    button:hover { opacity:0.8}
</style>