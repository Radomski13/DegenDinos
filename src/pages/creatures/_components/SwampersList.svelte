<script>
    import { createEventDispatcher } from 'svelte';
    export let swampers = [];

    const dispatch = createEventDispatcher();
    
    const onSwamperClick = (id) => dispatch('click', {id});
</script>

{#if swampers.length}
<ul>
    {#each swampers as s}
    <li on:click={() => onSwamperClick(s.id)}>
        <div>
            <img src={s.image} />
        </div>
        <p>#{s.id}</p>
    </li>
    {/each}
</ul>
{:else}
    <div class="p-4 text-center">No swampers to choose from.<span class="underline block mt-2 cursor-pointer">Close Window</span></div>
{/if}

<style>
    ul {
        font-size:0;
    }

    ul li {
        font-size:10px;
        width:25%;
        display:inline-block;
        border-right:1px solid #316152;
        border-bottom:1px solid #316152;
    }

    ul li:hover {
        opacity:0.8;
        cursor:pointer;
    }
    @media (max-width: 550px) {
        ul li {
            width:33.33%;
        }
    }

    ul li > div {
        padding-bottom:100%;
        position:relative;
    }

    p {
        background-color:#fff;
        text-align:center;
        font-family: "Press Start 2P",cursive;
        padding:2px;
    }

    img {
        position:absolute;
        width:100%;
        height:100%;
    }

    div {
        color:#fff;
        font-family: "Press Start 2P",cursive;
    }

</style>