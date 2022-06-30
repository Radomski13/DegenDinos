<script>
  import { transaction } from "../stores/transaction";
  export let isVisible = false;
  export let title = "";
  export let message = "";
  export let tx = 1;
</script>

{#if isVisible}
<div class="transactionModalV2_background">&nbsp;</div>
<div class="transactionModalV2__modal" style="height:{tx ? 170 : 140}px">
  <h2>{title}</h2>
  <p>{message}</p>
  <div class="text-center">
    {#if tx}
      <a href="https://etherscan.io/tx/{tx}" target="_BLANK">View Transaction</a>
    {/if}
    <button on:click={() => transaction.setModal(false)} href="#">Close modal</button>
  </div>
  <slot />
</div>
{/if}

<style>

  button {
    position:absolute;
    font-size:8px;
    display:block;
    margin-top:10px;
    bottom:10px;
    text-align:center;
    width:100%;
    color:#666
  }

  p { 
    color:#4D4D4D;
    padding:5px;
  }

  div {
      font-size:12px;
      color:#333;
      font-family: "Press Start 2P",cursive;
      text-align:center;
      @apply mt-3;
  }

  h2 {
      color:#000;
      font-family: "Press Start 2P",cursive;
      @apply mt-3;
      @apply mb-3;
      @apply text-center;
  }

  a {
    background-color: #4CA8EF;
    color:#fff;
    font-size:8px;
    display:inline-block;
    padding:5px 15px;
    border-radius:3px;
  }

  .transactionModalV2_background {
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

  .transactionModalV2__modal {
      position:absolute;
      z-index:99999;
      width: 350px; 
      top: 10%;
      left: 0;
      right: 0;
      margin: auto;
      background-color:#fff;
      border-radius:5px;
      border:8px solid #4CA8EF;
      overflow:scroll;
      padding:5px;
  }
</style>