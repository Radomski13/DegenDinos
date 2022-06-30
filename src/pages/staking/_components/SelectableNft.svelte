<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let nfts = [];
  export let selected = [];
</script>

<ul>
{#each nfts as nft}
<li class:selected={selected.includes(nft.id)} on:click={() => !selected.includes(nft.id) ? dispatch('select', nft.id) : dispatch('unselect', nft.id) }>
  <div style="background-image: url('{nft.image}')"></div>
  <p>{nft.name}</p>
</li>
{/each}
</ul>

<style>
li {
  width:150px;
  margin-right:15px;
  margin-top:15px;
  display:inline-block;
  opacity:0.2;
  cursor:pointer;
}
li:hover { opacity:1}

li.selected { opacity:1}

div {
  padding-bottom: 100%;
  background-size: contain; 
  border-radius:5px;
}

p {
  font-family: "Press Start 2P",cursive;
  padding-top: 5px;
  font-size:11px;
  color:#fff;
}
</style>