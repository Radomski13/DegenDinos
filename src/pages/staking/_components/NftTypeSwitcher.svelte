<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let active = "swampers";
  if(active !== "swampers" && active !== "creatures") active = "swampers";
</script>


<section>
  <div class:active="{active === 'swampers'}" on:click={() => dispatch('click', "swampers")}>Swampers</div>
  <div class:active="{active === 'creatures'}" on:click={() => dispatch('click', "creatures")}>Creatures</div>
</section>


<style>
  section {
    font-size:0;
  }

  div {
    @apply p-3;
    @apply text-center;
    @apply inline-block;
    @apply w-1/2;
    font-size:18px;
    border-bottom:3px solid #90B3D1;
    cursor: pointer;
    color:#fff;
  }

  div.active {
    border-bottom:3px solid #fff;
    font-weight:bold;
  }

</style>