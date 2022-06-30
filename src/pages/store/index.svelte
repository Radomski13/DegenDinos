<script>
    import { storeWallet } from "../../stores/store";
    import StoreItem from "./_components/StoreItem.svelte";
    import RecentOrders from "./_components/RecentOrders.svelte";
    import Background from "../../components/Background.svelte";

    $: storeItems = [];

    const getItems = async () => {
        const fetchItems = await (await fetch("https://api.swamps.io/store", { method: 'GET', headers: { "X-API-KEY": $storeWallet.walletSignature } })).json();
        storeItems = fetchItems.sort((a,b) => a.price - b.price);
    }
    getItems();

</script>

<Background imageUrl="/images/shop_images/store-bg.png" showOverlay>
    <RecentOrders />
    <section>
        {#each storeItems as item}
        <div>
            <a href="/store/{item.id}"><StoreItem {item} /></a>
        </div>
        {/each}
    </section>
</Background>

<style>
    section {
        text-align:center;
        font-size:0;
        max-width:650px;
        width:90%;
        margin:25px auto 0 auto;
    }

    div {
        width:300px;
        display:inline-block;
        margin-right:15px;
        margin-bottom:15px;
        cursor:pointer;
    }
    div:hover {
        opacity:0.9;
    }
    div:nth-child(even) {
        margin-right:0;
    }
</style>