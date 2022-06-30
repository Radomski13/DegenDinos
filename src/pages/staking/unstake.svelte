<script>
  import { isConnected, getWallet } from "../../utils/web3";
  import SubHeader from "./_components/SubHeader.svelte";
  import { 
    isSwampersApproved,
    approveSwamperContract,
    isCreaturesApproved,
    approveCreaturesContract,
    getStakedSwamperIds,
    getStakedCreatureIds,
    withdrawSwampers,
    withdrawCreatures,
    } from "./utils";
  import NftTypeSwitcher from "./_components/NftTypeSwitcher.svelte";
  import SelectableNft from "./_components/SelectableNft.svelte";
  import { fetchSwampverseNfts, fetchCreaturesNfts } from "../../utils/nfts";
  import TransactionModal from "../../components/TransactionModalV2.svelte";
  import { transaction } from "../../stores/transaction";

  $: connected = null;
  $: wallet = null;
  $: category = "swampers";
  $: swampverseNfts = [];
  $: creaturesNfts = [];
  $: selected = [];
  $: swampersApproved = false;
  $: creaturesApproved = false;
  
  const setInitialData = async () => {
    transaction.reset();
    transaction.setMessage("Staking transaction pending..");

    connected = await isConnected();

    if(connected) {
      wallet = await getWallet();
      swampersApproved = await isSwampersApproved(wallet);
      creaturesApproved = await isCreaturesApproved(wallet);

      swampverseNfts = (await getStakedSwamperIds(wallet)).map(id => {
        return {
          id,
          name: "Swamper #"+id,
          image: "https://api.swamps.io/nft/swampers/"+id+"/image"
        }
      });

      creaturesNfts = (await getStakedCreatureIds(wallet)).map(id => {
        return {
          id,
          name: "Creature #"+id,
          image: "https://api.swamps.io/nft/creatures/"+id+"/image"
        }
      });

    }
  }
  setInitialData();

</script>

  <TransactionModal isVisible={$transaction.showModal} title={$transaction.title} message={$transaction.message} tx={$transaction.tx} />

  <SubHeader title="Staked Inventory" subtitle="Un-Stake Swampers & Creatures" backable />
  <br />

  <section>
    <NftTypeSwitcher active={category} on:click={(x) => { selected = []; category = x.detail; }} />
    
    <div class="text-center">
    {#if (category === "swampers" && swampersApproved) || (category === "creatures" && creaturesApproved)}
      <button disabled={!selected.length} on:click={() => category === "creatures" ? withdrawCreatures(selected, wallet) : withdrawSwampers(selected, wallet)}>Un-Stake Selected {category[0].toUpperCase() + category.substring(1)} ({selected.length})</button>
      <SelectableNft 
        nfts={category === "creatures" ? creaturesNfts : swampverseNfts} 
        {selected} 
        on:select={(x) => { selected.push(x.detail); selected = selected; }} 
        on:unselect={(x) => { selected.splice(selected.indexOf(x.detail), 1); selected = selected; }} />
    {:else}
      {#if category === "swampers"}
        <button on:click={() => approveSwamperContract(wallet)}>Set Approval for all swampers</button>
      {:else}
        <button on:click={() => approveCreaturesContract(wallet)}>Set Approval for all creatures</button>
      {/if}
    {/if}
    </div>
  </section>

<style>

  button {
    background-color: #90B3D1;
    color:#fff;
    display:block;
    width:100%;
    margin-top:20px;
    border-radius:5px;
    padding:10px;
    font-weight:bold;
  }
  button:hover { opacity:0.8 }

  section {
    margin:0 auto;
    max-width:1200px;
    width:90%;
  }

</style>