<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let croakCost = 0;
    export let shippingCost = 0;
    export let buttonText;
    export let cancelText = null;
    export let tx;
    export let isVisible;

    const onButtonClick = () => dispatch('buttonClick');
    const onCancel = () => dispatch('cancel');
</script>

{#if isVisible}
<div class="storeModal-background">&nbsp;</div>

<div class="storeModal">
    <div class="storeModal__title">Purchase</div>
    <div class="storeModal__body">
        <div style="margin-bottom:10px;">
            <div style="display:inline-block;width:25px;height:25px;border-radius:50%;border:1px solid #fff;">&nbsp;</div>
            Item &mdash; {croakCost.toLocaleString()} $CROAKS
            <div style="float:right;font-size:12px;margin-top:3px;">Pending..</div>
        </div>

        <div>
            <div style="display:inline-block;width:25px;height:25px;border-radius:50%;border:1px solid #fff;">&nbsp;</div>
            Shipping &mdash; {shippingCost} ETH
            <div style="float:right;font-size:12px;text-decoration:underline;margin-top:3px;">Pay</div>
        </div>
    </div>
    <!-- <div style="text-align:center;">
        {#if cancelText}<button class="storeModal__cancelButton" on:click={() => onCancel()}>{cancelText}</button>{/if}
        <button on:click={() => onButtonClick()}>{buttonText}</button>
    </div> -->
</div>
{/if}

<style>
    a {
        background-color:#fff;
        color:#333333;
        padding:5px;
        border-radius:3px;
        margin-top:10px;
        display:inline-block;
    }
    .storeModal {
        max-width:600px;
        width:80%;
        background-color: #333333;
        border:2px solid #fff;
        color:#fff;
        font-family: "Press Start 2P",cursive;
        z-index:99999;
        position:absolute;
        top:50px;
        left: 50%;
        transform: translateX(-50%);
    }

    .storeModal__title {
        text-align:center;
        border-bottom:2px solid #fff;
        padding:15px;
        font-size:32px;
    }

    .storeModal__body {
        padding:15px;
    }

    .storeModal .storeModal__cancelButton {
        background-color:#333333;
    }
    .storeModal .storeModal__cancelButton:hover {
        background-color:#333333;
        opacity:0.8;
    }

    .storeModal button {
        background-color: #1E8A00;
        border:2px solid #fff;
        display:inline-block;
        text-align:center;
        padding:10px;
        font-size:24px;
        margin-bottom:15px;
    }
    .storeModal button:hover {
        background-color: #2DBB01;
    }

    .storeModal-background {
        position:fixed;
        top:0;
        left:0;
        z-index:1055;
        width:100%;
        height:100%;
        overflow-x:hidden;
        overflow-y:auto;
        background-color:#000;
        opacity:0.5;
        transition: opacity .15s linear;
    }
</style>