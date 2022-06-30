<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let title;
    export let message;
    export let buttonText;
    export let cancelText = null;
    export let tx;
    export let isVisible;

    const onButtonClick = () => dispatch('buttonClick');
    const onCancel = () => dispatch('cancel');
</script>

{#if isVisible}
<div class="transactionModal-background">&nbsp;</div>

<div class="transactionModal">
    <div class="transactionModal__title">{title}</div>
    <div class="transactionModal__body">
        {message}
        {#if tx}
        <a target="_BLANK" href="https://etherscan.io/tx/{tx}">View Transaction</a>
        {/if}
    </div>
    <div style="text-align:center;">
        {#if cancelText}<button class="transactionModal__cancelButton" on:click={() => onCancel()}>{cancelText}</button>{/if}
        <button on:click={() => onButtonClick()}>{buttonText}</button>
    </div>
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
    .transactionModal {
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

    .transactionModal__title {
        text-align:center;
        border-bottom:2px solid #fff;
        padding:15px;
        font-size:32px;
    }

    .transactionModal__body {
        padding:15px;
    }

    .transactionModal .transactionModal__cancelButton {
        background-color:#333333;
    }
    .transactionModal .transactionModal__cancelButton:hover {
        background-color:#333333;
        opacity:0.8;
    }

    .transactionModal button {
        background-color: #1E8A00;
        border:2px solid #fff;
        display:inline-block;
        text-align:center;
        padding:10px;
        font-size:24px;
        margin-bottom:15px;
    }
    .transactionModal button:hover {
        background-color: #2DBB01;
    }

    .transactionModal-background {
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