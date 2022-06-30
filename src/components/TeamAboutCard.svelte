
<script>
    export let team = [];
</script>

<section>
    <h2>Team</h2>
    {#if team.length}
        {#each team as t}
        <div>
            <img src={t?.imageUrl} />
            <span>{t?.name}</span>
            <p>{t?.role}</p>
            <a href="https://twitter.com/{t?.twitterHandle}">
                <img style="width:15px;" src="/icons/twitterlogo.svg" />
            </a>
        </div>
        {/each}
    {/if}
</section>

<style>
    section {
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

    div {
        padding:0px 10px;
        width:25%;
        text-align:center;
        display:inline-block;
        margin-bottom:15px;
    }
    div:last-child { margin-right: 0;}

    div > img {
        display:block;
        margin:0 auto;
        margin-bottom:5px;
        width:100px;
        border-radius:3px;
    }

    div > span {
        font-size:14px;
    }

    p {
        line-height: 1.3rem;
         font-family: "Roboto",sans-serif;
         white-space: pre-line
    }

    h2 {
        font-size:25px;
        margin-bottom:15px;
    }

    a {
        display:inline-block;
    }

    @media (max-width: 750px) {
        div {
            width: 33%;
        }
    }

    @media (max-width: 585px) {
        div {
            width:100%;
            display:block;
            margin-bottom:15px;
        }
        div > img {
            margin: 0;
            width:100%;
        }
    }
</style>