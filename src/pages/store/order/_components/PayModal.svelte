<script>
    export let isVisible = false;
    export let title = "";
    export let message = "";
</script>


{#if isVisible}
<div class="orderPayModal_background">&nbsp;</div>
<div class="orderPayModal__modal">
    <h2>{title}</h2>
    {message}
    <slot />
</div>
{/if}

<style>

    div {
        font-size:12px;
        color:#333;
        font-family: "Press Start 2P",cursive;
        text-align:center;
        @apply mt-3;
    }

    h2 {
        color:#333;
        font-family: "Press Start 2P",cursive;
        @apply mt-3;
        @apply mb-3;
        @apply text-center;
    }
    .orderPayModal_background {
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

    .orderPayModal__modal {
        position:absolute;
        z-index:99999;
        max-width:500px;
        width:90%;
        height:350px;
        top: 10%;
        left: 0;
        right: 0;
        margin: auto;
        background-color:#fff;
        border-radius:5px;
        border:8px solid #4CA8EF;
        overflow:scroll;
        width: 300px; 
        height:150px;
    }
</style>