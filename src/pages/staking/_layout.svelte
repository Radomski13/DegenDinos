<script>
  import { onMount } from "svelte";
  import { isConnected, connect, getWallet } from "../../utils/web3";
  import { getAirdropAmount, getClaimedStatus } from "../../utils/merkel";
  import Background from "./_components/Background.svelte";

  $: connected = false;
  $: wallet = null;
  $: airdropAmount = null;
  $: isClaimed = null;

  const setInitialData = async () => {
    connected = await isConnected();
    
    if(connected) {
      wallet = await getWallet();
      isClaimed = await getClaimedStatus(wallet);
      airdropAmount = await getAirdropAmount(wallet);
    }

  }
  setInitialData();
    
  onMount(() => {
      // @ts-ignore
      window.ethereum?.on("accountsChanged", accounts => {
          //clear wallet signature if account is changed
          localStorage.clear();
          window.location.reload();
      })

      //watch for tamper in wallet signature
      window.addEventListener('storage', e => {
          if(e.key === "signature" && e.oldValue !== null) window.location.reload()
      })
  })
</script>

<Background imageUrl="/images/croaks-bg.png" opacity={0.03} backgroundColor="#6092BE" />

{#if !isClaimed && airdropAmount > 0}
<a href="/croaks">Claim your $CROAK snapshot</a>
{/if}

<header>
  <img src="/images/swamper-logo.png" width="40" style="display:inline-block" />
  <img src="/images/creature-logo.png" width="50" style="display:inline-block" />
</header>

{#if connected}
<slot />
{:else}

<div class="text-center mt-5">
  <button on:click={() => connect()}>Connect Wallet</button>
</div>

{/if}

<style>

  header {
    margin-top:25px;
    text-align:center;
    padding:10px;
  }

  a {
    display:block;
    width:100%;
    background-color:#4678A4;
    color:#fff;
    font-family: 'Press Start 2P', Arial;
    font-size:10px;
    text-align:center;
    padding:10px;
  }

  /* h1 {
    font-family: "Press Start 2P", Arial;
    color:#000;
    margin-top:15px;
    font-size:28px;
  } */

  button {
    font-family: "Press Start 2P", Arial;
    cursor:pointer;
    color:#fff;
  }
  button:hover { opacity:0.5}
</style>