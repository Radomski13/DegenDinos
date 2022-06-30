
<script>
    export let title = "";
    export let description = "";
    export let features = [];
    export let osUrl = "";
</script>

<div>
    <h2>{title}</h2>
    <p>{@html description}</p>
    <slot />
    {#if osUrl.length}<a target="_BLANK" href={osUrl}>Buy on Opensea</a>{/if}
    {#if features.length}
        <h3>Features</h3>
        <ul>
        {#each features as f}
        <li>{@html f}</li>
        {/each}
        </ul>
    {/if}
</div>

<style>
    div {
        font-family: "Press Start 2P",cursive;
        background-color:#326693;
        border-radius:5px;
        color:#fff;
        padding:25px;
        max-width:800px;
        width:90%;
        margin: 25px auto;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    }

    a {
        border-radius:3px;
        background-color:#fff;
        display:inline-block;
        color:#31628D;
        padding:5px 15px;
        margin-top:20px;
        font-size:12px;
    }

    p {
        line-height: 1.3rem;
         font-family: "Roboto",sans-serif;
         white-space: pre-line
    }

    h2 {
        font-size:25px;
        margin-bottom:5px;
    }

    h3 { 
        margin-top:25px;
        margin-bottom:10px;
        font-size:16px;
    }

    

    li {
        list-style-type: circle;
        font-family: "Roboto",sans-serif;
        margin-left:15px;
    }
</style>