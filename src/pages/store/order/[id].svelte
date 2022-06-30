<script>
    import { storeWallet } from "../../../stores/store";
    import { connect, isConnected, getWallet, verifyWallet, verifySignature } from "../../../utils/web3";
    import { params } from "@roxi/routify";
    import Background from "../../../components/Background.svelte";
    import ItemRow from "./_components/ItemRow.svelte";
    import Status from "./_components/Status.svelte";
    import PayModal from "./_components/PayModal.svelte";
    import { purchase, payShipping } from "../_utils/transactions";
    import RecentOrders from "../_components/RecentOrders.svelte";

    $: connected = null;
    $: wallet = null;
    $: order = null;
    $: loadingStoreWallet = true;
    $: paying_cost = false;
    $: paying_shipping = false;

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
            else loadingStoreWallet = false;

            order = await getOrder();
        }
    }

    const verify = async () => {
        const signature = await verifyWallet();
        storeWallet.setWalletSignature(signature);
        window.location.reload();
    }

    const getOrder = async () => {
        const fetchOrder = await (await fetch("https://api.swamps.io/order/"+$params.id, { method: 'GET', headers: { "X-API-KEY": $storeWallet.walletSignature } })).json();
        if(fetchOrder.result !== "success") window.location.href = "/";
        else return fetchOrder;
    }

    setInitialData();

</script>

<Background imageUrl="/images/shop_images/store-bg.png" showOverlay>

    <PayModal isVisible={false} title="Error" message="This is a message. Please abide." />

    {#if order}
      <RecentOrders />
        {#if connected === false}
            <button on:click={() => connect()}>Connect Wallet</button>
        {:else if !$storeWallet.walletSignature && !loadingStoreWallet}
            <button on:click={() => verify()}>Verify Wallet</button>    
        {:else if loadingStoreWallet}
            &nbsp;
        {:else}
            <section>
                <div style="font-size:10px;margin-bottom:10px">
                    <h2 class="p-4 pb-3">Order Confirmation (#{$params.id})</h2>
                    <div class="p-2 mb-2 text-center rounded" style="font-size:8px;border:1px dashed #eee;width:95%;margin:0 auto;background-color:#eee; margin-bottom:15px;">Orders may take 4-6 weeks to ship.<br />Non-completed orders will be canceled within 72 hours.</div>
                    
                    <img alt="" class="ml-4" style="width:50px;float:left;margin-right:10px;" src={order.image_url} />
                    <p>{order.name} {#if order.size || order.color}&mdash;{/if} {order.size?.toUpperCase() || ""}{order.size ? " / " : ""}{order.color?.toUpperCase() || ""}</p>
                    <p>Ordered on {new Date(order.ordered_at).toLocaleString([], {year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
                    <Status {order} />
                </div>

                {#if !order.canceled}
                    <ItemRow tx={true} confirmed={true}>Item Reserved</ItemRow>
                    <ItemRow on:pay={() => purchase(order.price, wallet, $storeWallet.walletSignature, $params.id)} tx={order.purchase_tx || null} confirmed={order.purchase_tx_confirmed}>Cost &mdash; {order.price} $CROAK</ItemRow>
                    {#if order.domestic_shipping_price}<ItemRow on:pay={() => payShipping((order.intl_order ? order.intl_shipping_price : order.domestic_shipping_price), wallet, $storeWallet.walletSignature, $params.id)} tx={order.shipping_tx || null} confirmed={order.shipping_tx_confirmed}>Shipping &mdash; {order.intl_order ? order.intl_shipping_price : order.domestic_shipping_price} ETH</ItemRow>{/if}
                {/if}

            </section>
        {/if}
    {/if}
</Background>

<style>

    section {
        font-family: "Press Start 2P",cursive;
        background-color:#fff;
        max-width:650px;
        width:90%;
        margin:25px auto 0 auto;
        border-radius:5px;
    }

    h2 {
        font-size:18px;
        font-weight:bold;
    }

    button {
        display:block;
        width:300px;
        margin:0 auto;
        background-color:#fff;
        color: #49A0E4;
        border-radius:5px;
        font-family: "Press Start 2P",cursive;
        padding:5px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    }
    button:hover {
        opacity:0.9;
    }
    button:disabled {
        color:#B0CCDF;
        cursor:not-allowed;
    }

    @media (max-width: 500px) {
      h2 {
        font-size:16px;
      }
    }

</style>