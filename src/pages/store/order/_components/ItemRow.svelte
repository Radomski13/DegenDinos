<script>
    import { createEventDispatcher } from 'svelte';
    export let tx = null;
    export let confirmed = false;

    const dispatch = createEventDispatcher();
</script>


<div class="orderItemRow__item">    
    <div class="orderItemRow">
        <div class="orderItemRow__checkbox {!tx ? "orderItemRow__checkbox_empty" : "orderItemRow__checkbox_complete"} {!confirmed ? "opacity-30" : ""}"></div>
        <div class="orderItemRow__lineLabel"><slot /></div>
    </div>
    <div class="orderItemRow__transaction">
      {#if !tx}
      <button on:click={() => dispatch('pay')}>Pay now</button>
      {:else}
      {#if tx !== true}<a target="_BLANK" href="https://etherscan.io/tx/{tx}">View Transaction</a>{/if}
      {/if}
    </div>
</div>


<style>


    button {
        @apply rounded;
        background-color:#FFEEEE;
        font-size:8px;
        padding:5px;
        color:#E84117;
        cursor:pointer;
    }
    button:hover {
        opacity:0.8
    }

    a {
        @apply rounded;
        background-color:#eee;
        font-size:8px;
        padding:5px;
        color:#333
    }

    .orderItemRow__checkbox {
        @apply ml-4;
        @apply align-middle;
        @apply w-7;
        @apply h-7;
        @apply rounded-full;
        @apply inline-block;
    }

    .orderItemRow__checkbox_complete {
        border:3px solid #3DAE60;
        background-color:#49CC71;
    }

    .orderItemRow__checkbox_empty {
        border:3px solid #e3e3e3;
    }
    

    .orderItemRow__item {
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border-bottom:1px solid #eee;
        padding:10px 0;
    }
    .orderItemRow__item:last-child {
        border-bottom:0;
    }

    .orderItemRow__lineLabel {
        @apply align-middle;
        @apply inline-block;
        @apply ml-1;
        font-size:16px;
        font-weight:400;
        color:#4D4D4D;
    }

    .orderItemRow {
      overflow:hidden;
    }

    .orderItemRow__transaction {
      @apply mr-4;
      @apply mt-1;
      @apply ml-4;
      font-size:12px;
    }

    @media (max-width: 600px) {

      .orderItemRow__transaction {

      }
      
      .orderItemRow__checkbox {
        width:25px;
        height:25px;
      }
      .orderItemRow__lineLabel {
        font-size:12px;
      }
    }

</style>