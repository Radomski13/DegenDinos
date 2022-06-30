<script>
    import Hamburger from 'svelte-hamburgers';
    import MobileMenu from './MobileMenu.svelte';
    import { isConnected, connect } from "../utils/web3";
    import { afterPageLoad } from "@roxi/routify"
    import { isStoreReleased } from "../utils/helpers";

    $: connected = false;

    const setInitialData = async () => {
        connected = await isConnected();
    }
    setInitialData();

    let open = false;
    $afterPageLoad(() => open = false)
</script>

<svelte:head>
	<!-- Import base css -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/base.css" />
	
	<!-- Import spin css (spin is default type) -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/types/spin.css" />
</svelte:head>

<header>
    <a href="/"><h1>Swampverse</h1></a>
    <ul class="header-nav-links">
        <li><a href="/about">About</a></li>
        <li><a href="/staking">Staking</a></li>
        {#if isStoreReleased()}<li><a href="/store">Store</a></li>{/if}
        <li>
            <a href={connected ? "/profile" : "#"}>
                {#if connected}
                My Profile
                {:else}
                <div class="header__connect" on:click={() => connect()}>Connect</div>
                {/if}
            </a>
        </li>
    </ul>
    <ul class="social">
        <li>
            <a href="https://twitter.com/SwampverseNFT">
                <img src="/icons/twitter-white.png" alt="twitter" />
            </a>
        </li>
        <li>
            <a href="https://discord.gg/swampverse">
                <img src="/icons/discord-white.png" alt="discord" />
            </a>
        </li>
        <li>
            <a href="https://opensea.io/collection/swampverseofficial">
                <img src="/icons/opensea-white.png" alt="opensea" />
            </a>
        </li>
    </ul>
    <div class="mobile-hamburger">
        <Hamburger bind:open --color="white" />
    </div>
    <MobileMenu bind:open {connected} />
</header>

<style>

    .header__connect { 
        background-color:#fff;
        color:rgb(35, 75, 119);
        padding:3px 7px 1px 7px;
        border-radius:2px
    }

    header {
        position:fixed;
        z-index:999;
        top:0;
        left:0;
        width:100%;
        height:65px;
        background-color: #2D5E8A;
        font-family: "Press Start 2P",cursive;
        color:#fff;
        padding:20px;
        display: flex;
        align-items: center;
	    justify-content: space-between;
    }

    h1 {
        font-size:20px;
    }

    ul > li {
        display: inline-block;
    }

    ul.header-nav-links {
        font-size: 14px;
    }
    ul.header-nav-links li {
        padding: 0px 0.5rem;
    }

    ul > li a:hover {
        color: #ddd;
    }

    li img {
        width: 32px;
    }
    li img:hover { opacity:0.7 }

    .mobile-hamburger { display:none; }

    @media (max-width: 1050px) {
        .header-nav-links, .social { display: none; }
        .mobile-hamburger { position:fixed; right:0;display:block; z-index:999999}
        h1 { position:relative;z-index:9999999999}
    }

</style>