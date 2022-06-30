<script>
    export let nfts = [];
</script>

<ul>
{#each nfts as nft}
<li>
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
}

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