<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let item;
</script>

<div class="storeItem" on:click={() => dispatch('click')}>
    <div class="storeItem__imageHolder" style="background-image:url('{item.image_url}')"></div>
    <p>
        {item.name}<br />
        <span style="font-size:10px;">{Number(item.price).toLocaleString()} $CROAKS</span>
    </p>
</div>

<style>

    .storeItem {
        width:100%;
        display:inline-block;
        position:relative;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        border-radius:5px;
        background-color: rgba(0,0,0,0.5);
    }
    .storeItem__imageHolder {
        padding-bottom: 100%;
        background-size:contain;
        border-radius:5px;
        overflow:hidden;
    }

    p {
        position:absolute;
        bottom:0;
        width:100%;
        text-align:center;
        color:#fff;
        background-color: rgba(0,0,0,0.5);
        padding: 5px 0;
        font-family: "Press Start 2P",cursive;
        font-size:12px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
</style>