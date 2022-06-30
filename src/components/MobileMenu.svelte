<script>
    import { connect } from "../utils/web3";
    import { isStoreReleased } from "../utils/helpers";

    export let open;
    export let connected;

    const links = [
        { href: "/about", name: "About" },
        { href: "/staking", name: "Staking" },
    ]

    if(isStoreReleased()) links.push({ href: "/store", name: "Store" });

</script>

{#if open}
    <div>
        <nav>
        {#each links as link, i}
            <a href={link.href}>
                {link.name}
            </a>
        {/each}
        <a href={connected ? "/profile" : "#"}>
            {#if connected}
            My Profile
            {:else}
            <span on:click={() => connect()}>Connect</span>
            {/if}
        </a>
        </nav>

        <ul class="mobile-social">
            <li>
                <a target="_BLANK" href="https://twitter.com/SwampverseNFT">
                    <img src="/icons/twitter-white.png" alt="twitter" />
                </a>
            </li>
            <li>
                <a target="_BLANK" href="https://discord.gg/swampverse">
                    <img src="/icons/discord-white.png" alt="discord" />
                </a>
            </li>
            <li>
                <a target="_BLANK" href="https://opensea.io/collection/swampverseofficial">
                    <img src="/icons/opensea-white.png" alt="opensea" />
                </a>
            </li>
        </ul>
    </div>
{/if}

<style>
    div {
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color: rgba(51, 50, 51, 0.801);
        text-align: center;
        font-size: 1.5em;
        letter-spacing: 0.15em;
        padding: 1em;
        padding-top:75px;
        color: #fff;
    }
    nav a {
        cursor: pointer;
        width: 100%;
        display:block;
        margin: 1rem auto;
    }
    nav a span {
        display:inline-block;
        background-color:#fff;
        color:rgba(51, 50, 51, 0.801);
        padding:3px 7px 1px 7px;
        border-radius:2px
    }
    nav a:hover {
        text-decoration: underline;
    }

    .mobile-social {
        margin-top:50px;
    }

    ul.mobile-social li {
        display: inline-block;
        width:32px;
    }
</style>
