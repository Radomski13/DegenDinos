<script>
  import { isConnected, getWallet } from "../../utils/web3";
  import InfoContainer from "./_components/InfoContainer.svelte";
  import InfoItem from "./_components/InfoItem.svelte";
  import SubHeader from "./_components/SubHeader.svelte";
  import { getPercentSwamperStaked, getUserInfo, getReward, getClaimableCroak, getSwamperRewardPerDay, getCreatureRewardPerDay, getUnstakedSwampers, getUnstakedCreatures } from "./utils";
  import { getBalance as getCroakBalance } from "../croaks/utils";
  import TransactionModal from "../../components/TransactionModalV2.svelte";
  import { transaction } from "../../stores/transaction";

  $: connected = null;
  $: wallet = null;
  $: swamperRewardPerDay = 0;
  $: creatureRewardPerDay = 0;
  $: userInfo = null;
  $: croakBalance = 0;
  $: claimableCroak = 0;
  $: unstakedSwampers = 0;
  $: unstakedCreatures = 0;
  $: percentStaked = null;

  const setInitialData = async () => {
    connected = await isConnected();

    if(connected) {
      wallet = await getWallet();
      userInfo = await getUserInfo(wallet);
      swamperRewardPerDay = await getSwamperRewardPerDay();
      creatureRewardPerDay = await getCreatureRewardPerDay();
      croakBalance = await getCroakBalance(wallet);
      claimableCroak = await getClaimableCroak(wallet);
      unstakedSwampers = await getUnstakedSwampers(wallet);
      unstakedCreatures = await getUnstakedCreatures(wallet);
      percentStaked = await getPercentSwamperStaked();
    }
  }
  setInitialData();

</script>

<SubHeader title="Staking" subtitle="$CROAK Balance: {croakBalance.toLocaleString()}" stats={percentStaked} />

<br />

<TransactionModal isVisible={$transaction.showModal} title={$transaction.title} message={$transaction.message} tx={$transaction.tx} />

{#if userInfo}
  <InfoContainer>
    <InfoItem left label="$CROAK per day" amount={(Number(userInfo.stakedSwamperCount)*swamperRewardPerDay)+(Number(userInfo.stakedCreatureCount)*creatureRewardPerDay)} />
    <InfoItem right label="Claimable $CROAK" amount={claimableCroak.toLocaleString()} />
  </InfoContainer>

  <InfoContainer>
    <InfoItem left label="Staked Swampers" amount={`${userInfo.stakedSwamperCount} of ${unstakedSwampers+Number(userInfo.stakedSwamperCount)}`} />
    <InfoItem right label="Staked Creatures" amount={`${userInfo.stakedCreatureCount} of ${unstakedCreatures+Number(userInfo.stakedCreatureCount)}`} />
  </InfoContainer>

  <div class="text-center">
    <a href="/staking/stake">Stake</a>
    <a href="/staking/unstake">Unstake</a>
    <a href="#" style="opacity:{claimableCroak > 0 ? 1 : 0.3}" on:click={() => claimableCroak > 0 && getReward(wallet)}>Claim</a>
  </div>

{/if}

<style>

  a {
    display:inline-block;
    text-decoration: underline;
    font-size:24px;
    margin-right:25px;
    color:#fff;
  }
  a:last-child { margin-right:0; }

</style>