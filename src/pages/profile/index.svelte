
<script>
    import { isConnected, getWallet } from "../../utils/web3";
    import { fetchSwampverseNfts, fetchCreaturesNfts } from "../../utils/nfts";
    
    import Nfts from "../../components/Nfts.svelte";
    import Card from "../../components/Card.svelte";

    $: connected = null;
    $: wallet = null;
    $: nfts = [];

    const setInitialData = async () => {
        connected = await isConnected();

        if(connected) {
            wallet = await getWallet();

            const swampverseNfts = await fetchSwampverseNfts(wallet);
            const creaturesNfts = await fetchCreaturesNfts(wallet);

            nfts = swampverseNfts.concat(creaturesNfts);
       }
       else window.location.href = "/";
    }
    setInitialData();
</script>

{#if connected}
<Card>
    <h1>My Profile</h1>
    <a href="/profile/store">Store Account Info</a>
    <div>
        <p>Wallet: {wallet}</p>
        <p>Wallet Content</p>
        <Nfts nfts={nfts} />
    </div>
</Card>
{/if}

<style>
    div {
        background-color:#2C5E8A;
        padding:10px;
        border-radius:5px;
        margin-top:20px;
        text-align:left;
    }

    h1 {
        font-size:26px;
        color:#fff;
        margin-bottom:15px;
    }

    p {
        margin-bottom:15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    a {
        text-decoration: underline;
    }
    a:hover { opacity:0.9}
</style>