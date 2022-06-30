<script>
    $: stats = null;

    const fetchStats = async () => {
        const url = `https://api.opensea.io/api/v1/collection/swampverseofficial`;
        const stats = await (await fetch(url)).json();
        return stats.collection.stats;
    }  

    const setInitialData = async () => {
        stats = await fetchStats();
    };
    setInitialData();
</script>

<div class="index__first-part">
    <div class="index__bg-overlay">
        <p class="index__main-message">Join the swamp where your NFT itself doubles as membership to a tight-knit community, limited merchandise, events, P2E game and other collections such as Swampverse: Creatures or Swampverse: VX which are still yet to be released! Our goal is to help anyone break their way into the NFT world successfully while having fun.</p>
        <a class="index__cta" href="/about">Learn more</a>
        <a class="index__cta" style="background-color:#fff;color:#2A577D" href="https://swamp-docs.gitbook.io/swampaper">Whitepaper</a>

        {#if stats}
        <div class="stats">
            <div class="stats__card">
                <h5>Owners</h5>
                <p>{stats.num_owners?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>

            <div class="stats__card">
                <h5>Floor Price</h5>
                <p>{stats.floor_price} ETH</p>
            </div>

            <div class="stats__card">
                <h5>Volume</h5>
                <p>{(stats.total_volume/1000).toFixed(1)}K</p>
            </div>
        </div>
        {/if}
    </div>
</div>

<style>

    .index__first-part {
        width: 100%;
        background: url("/images/roadmap.jpeg") no-repeat 50%;
        background-size: cover;
        height: calc(100vh - 65px);
        position:relative;
    }

    .index__bg-overlay {
        overflow:hidden;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: rgba(0,0,0,.8);
        background: linear-gradient(180deg,rgba(0,0,0,.7) 50%,#2c5e8a);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .index__main-message {
        color:#fff;
        font-family: "Press Start 2P",cursive;
        max-width:800px;
        width:90%;
        font-size:12px;
        line-height:24px;
        margin-top:-50px;
    }

    .index__cta {
        font-family: "Press Start 2P",cursive;
        padding:10px 15px;
        background-color:#008001;
        color:#fff;
        border-radius:3px;
        margin-top:25px;
    }

    .stats {
        position:absolute;
        bottom:25px;
        text-align:center;
        color:#fff;
        font-family: "Press Start 2P",cursive;
    }
    .stats .stats__card {
        display: inline-block;
        margin-right: 50px;
    }

    .stats .stats__card:last-child {
        margin-right:0;
    }

    @media (max-width: 585px) {
        
        .stats .stats__card {
            display:block;
            margin-right:0;
            margin-bottom:10px;
        }
        .stats .stats__card:last-child {
            margin-bottom:0;
        }
    }

    @media (max-width: 585px) and (max-height: 800px) {
        .index__bg-overlay {
            justify-content: start;
        }
        .index__main-message {
            font-size:10px;
            line-height:18px;
            margin-top:25px;
        }
    }
</style>
