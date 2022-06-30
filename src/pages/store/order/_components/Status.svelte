<script>
    export let order = {};
</script>

<p>
    <span><b>Status:</b></span>
    {#if order.canceled}
        <span style="color:grey" class="inline-block pb-4">Canceled</span>
    {:else if !order.purchase_tx || (!order.shipping_tx && !order.shipping_tx_confirmed)}
        <span style="color:#E84117">Awaiting payment</span>
    {:else if !order.purchase_tx_confirmed || !order.shipping_tx_confirmed}
        <span style="color:#F39C23">Confirming transactions</span>
    {:else if !order.is_shipped}
        <span style="color:#428CCA">Awaiting shipment</span>
    {:else}
        <span style="color:#49CC71">Complete</span>
    {/if}
</p>

<style>
  span { color:#000;}
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right:10px;
    color:#eee;
  }
</style>