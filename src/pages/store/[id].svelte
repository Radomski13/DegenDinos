<script>
    import { storeWallet } from "../../stores/store";
    import { connect, isConnected, getWallet, verifyWallet, verifySignature } from "../../utils/web3";
    import { fetchNfts } from "../../utils/swamp";
    import { getBalance } from "../croaks/utils";
    import { getStakedNftCount } from "../staking/utils";
    import { params, goto } from "@roxi/routify";
    import Background from "../../components/Background.svelte";
    import StoreItem from "./_components/StoreItem.svelte";
    import VariantSelect from "./_components/VariantSelect.svelte";
    import RecentOrders from "./_components/RecentOrders.svelte";
    import PurchaseModal from "../../components/TransactionModal.svelte";


    $: connected = null;
    $: wallet = null;
    $: nfts = null;
    $: stakedNftsCount = 0;
    $: croaksBalance = null;
    $: loadingStoreWallet = true;
    $: item = null;
    $: colors = [];
    $: sizes = [];
    $: color = undefined;
    $: size = undefined;
    $: hasVariants = colors.length && sizes.length;
    $: shippingCost = getShippingCost($storeWallet.address?.country, item);
    $: showConfirmation = false;
    $: purchasing = false;

    const sizeWeights = { 'one size':1, 'xxs':2, 'xs':3, 's':4, 'm':5, 'l': 6, 'xl':7, 'xxl':8 }

    const getShippingCost = (country, item) => {
        if(!item) return 0;
        if(country === "United States of America") return item.domestic_shipping_price || 0;
        return item.intl_shipping_price || 0;
    }

    const setInitialData = async () => {
        connected = await isConnected();

        if(connected) {
            const localStorageSignature = await localStorage.getItem("signature");
            if(localStorageSignature) storeWallet.setWalletSignature(localStorageSignature);
            wallet = await getWallet();
            croaksBalance = await getBalance(wallet);

            //verify that the wallet signature equals current wallet
            if($storeWallet.walletSignature) {
                const verifySignatureVsWallet = await verifySignature($storeWallet.walletSignature, wallet);
                if(!verifySignatureVsWallet) storeWallet.reset();
            }

            nfts = await fetchNfts(wallet, 1);
            stakedNftsCount = await getStakedNftCount(wallet);

            if((nfts.length || stakedNftsCount) && $storeWallet.walletSignature) {
                const getAccount = await (await fetch("https://api.swamps.io/account", { method: 'GET', headers: { "X-API-KEY": $storeWallet.walletSignature } })).json();
                storeWallet.setAddress(getAccount.address);
                storeWallet.setOrders(getAccount.orders);
                loadingStoreWallet = false; 
            }
        }
    }

    const verify = async () => {
        const signature = await verifyWallet();
        storeWallet.setWalletSignature(signature);
        window.location.reload();
    }

    const getItem = async () => {
        const fetchItems = await (await fetch("https://api.swamps.io/store", { method: 'GET', headers: { "X-API-KEY": $storeWallet.walletSignature } })).json();
        item = fetchItems.find(i => i.id === $params.id)

        const colorSet = new Set();
        const sizeSet = new Set();
        item.variants.forEach(v => {
            if(v.color) colorSet.add(v.color);
            if(v.size) sizeSet.add(v.size);
        })

        colors = Array.from(colorSet);
        sizes = Array.from(sizeSet).sort((a,b) => sizeWeights[a] - sizeWeights[b]);
    }

    const purchaseItem = async () => {

        if(!purchasing) {
            try {
                let variant_id;

                purchasing = true;

                if(hasVariants && color && size)
                  variant_id = item.variants.find(v => v.color === color && v.size === size)?.id;
                else variant_id = item.variants[0].id;

                //first reserve
                const reserveOrder = await (await fetch("https://api.swamps.io/store/reserve", { 
                    method: 'POST',
                    headers: { "X-API-KEY": $storeWallet.walletSignature, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ store_item_id: item.id, variant_id })
                })).json();

                if(reserveOrder.result === "success") {
                    $goto(`/store/order/${reserveOrder.id}`);
                }
                else window.location.reload();
            }
            catch {
                window.location.reload();
            }
        }
    }

    getItem();
    setInitialData();

</script>

<PurchaseModal 
    title="Confirm"
    message="Are you sure you want to purchase this item? We are currently limiting one item per wallet."
    buttonText={purchasing ? "Purchasing.." : "Purchase"}
    isVisible={showConfirmation}
    tx={null}
    cancelText="Cancel"
    on:cancel={() => showConfirmation = false}
    on:buttonClick={() => purchaseItem()}
/>

<Background imageUrl="/images/shop_images/store-bg.png" showOverlay>
    {#if item}
    <RecentOrders />
    <div>
        <StoreItem {item} />
        {#if connected === false}
            <button on:click={() => connect()}>Connect Wallet</button>
        {:else if item}
            {#if $storeWallet.orders?.filter(order => order.store_item_id === item.id && !order.canceled).length > 0}
                <span class="storeItem__nftError">1 Item Limit</span>
            {:else if croaksBalance < Number(item.price)}
                <span class="storeItem__nftError">Not enough $CROAK</span>
            {:else if nfts}
                {#if stakedNftsCount > 0}
                    {#if !$storeWallet.walletSignature}
                    <button on:click={() => verify()}>Verify Wallet</button>
                    {:else if loadingStoreWallet}
                    &nbsp;
                    {:else}
                        {#if !$storeWallet.address}
                        <a href="/profile/address"><button>Add Shipping Address</button></a>
                        {:else}
                            {#if colors.length}<VariantSelect {colors} {sizes} bind:color={color} bind:size={size} variants={item.variants} />{/if}
                            
                            {#if hasVariants && (!color || !size)}
                                <button disabled>Buy Now</button>
                            {:else if hasVariants && color && size}
                                <button on:click={() => showConfirmation = true}>Buy Now</button>
                            {:else if !hasVariants && Number(item.variants[0].quantity) === 0}
                                <button disabled>Sold Out</button>
                            {:else}
                                <button on:click={() => showConfirmation = true}>Buy Now</button>
                            {/if}
        
                            <p>Shipping &mdash; {shippingCost === 0 ? "FREE" : `${shippingCost} Ξ`}</p>

                        {/if}
                    {/if}
                {:else}
                <a target="_BLANK" href="https://opensea.io/collection/swampverseofficial" class="storeItem__nftError">Staked NFT required</a>
                {/if}
            {/if}
        {/if}
    </div>
    {/if}
</Background>

<style>
    .storeItem__nftError {
        background-color:#fff;
        border-radius:5px;
        display:block;
        width:300px;
        margin:0 auto;
        padding:5px;
        font-family: "Press Start 2P",cursive;
        font-size:12px;
        border:3px solid #8C607F;
        text-align:center;
        cursor:not-allowed;
    }
    .storeItem__nftError:hover { opacity:0.9;}

    div {
        width:300px;
        margin: 0 auto;
        margin-top:25px;
        text-align:center;
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
    p {
        font-size:12px;
        color:#fff;
        font-weight:bold;
        margin-top:3px;
    }
</style>