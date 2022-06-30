<script>
    export let isVisible = false;
    export let size = "md";
</script>


{#if isVisible}
<div class="creatures__modal-background">&nbsp;</div>
<div class="creatures__modal {size}">
    <slot />
</div>
{/if}

<style>
    .creatures__modal-background {
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

    .creatures__modal {
        position:absolute;
        z-index:99999;
        max-width:500px;
        width:90%;
        height:350px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        background-color:#316152;
        border-radius:5px;
        border:8px solid #487A50;
        overflow:scroll;
    }

    .creatures__modal.sm { width: 300px; height:250px; }
    .creatures__modal.md { width: 500px; height:350px; }
</style>