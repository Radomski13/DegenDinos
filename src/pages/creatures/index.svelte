<script>
    import { CREATURES_ADDRESS } from "../../utils/constants";
    import { getBalance, getAllowance as getCroakAllowance, approve as approveCroak } from "../croaks/utils";
    import { isConnected, getWallet, connect } from "../../utils/web3";
    import { fetchSwampverseNfts } from "../../utils/nfts";
    import { mintCreature, isSwampversApproved, approveSwamper, getTotalSupply, isMintOn } from "./utils";
    import Background from "../../components/Background.svelte";
    import SwampersList from "./_components/SwampersList.svelte";
    import CreaturesModal from "./_components/CreaturesModal.svelte";
    import { creatureTransaction, approvalTransaction } from "./store";

    $: connected = null;
    $: wallet = null;
    $: croaksBalance = null;
    $: nfts = null;
    $: creatureSelectData = { 1: null, 2: null };
    $: creatureSelectModal = setCreatureSelectModal();
    $: swampersApproved = false;
    $: croaksApproved = 0;
    $: totalCreatureSupply = null;
    $: mintOn = false;

    const setCreatureSelectModal = (box = 1, isVisible = false) => { return { isVisible, box } }
    const getSwampData = (id) => nfts.find(nft => nft.id === id);

    const setInitialData = async () => {
       connected = await isConnected();

       if(connected) {
         wallet = await getWallet();
         croaksBalance = await getBalance(wallet);
         swampersApproved = await isSwampversApproved(wallet);
         croaksApproved = await getCroakAllowance(wallet, CREATURES_ADDRESS);
         nfts = await fetchSwampverseNfts(wallet);
         totalCreatureSupply = await getTotalSupply();
         mintOn = await isMintOn();
       }
    }

    setInitialData();
</script>

<Background imageUrl="/images/creatures-bg.png" position="top right">
    <img class="creatures__background" src="/images/creatures-header.png" />

    <CreaturesModal isVisible={creatureSelectModal.isVisible}>
        {#if nfts}
        <SwampersList 
            swampers={nfts?.filter(n => n.id !== creatureSelectData[1] && n.id !== creatureSelectData[2])}
            on:click={(e) => {
                creatureSelectData[creatureSelectModal.box] = e.detail.id;
                creatureSelectModal.isVisible = false;
            }}
        />
        {/if}
    </CreaturesModal>

    <CreaturesModal isVisible={$creatureTransaction.isModalVisible} size="sm">
        <div class="text-center">
            <!-- {#if !$creatureTransaction.tx_complete} to be used later if we want to watch -->
            {#if !$creatureTransaction.tx}
                {#if $creatureTransaction.message === null}
                    <!-- {#if $creatureTransaction.tx}
                    <a href="https://etherscan.io/tx/{$creatureTransaction.tx}" target="_BLANK" class="creatures__processing_title block underline">Processing</a>
                    {:else} -->
                    <div class="creatures__processing_title">Processing</div>
                    <!-- {/if} -->
                    <img src="/images/creatures-dna.gif" />
                {:else}
                    <div class="creatures__processing_title">Error</div>
                    <p class="creatures__processing_message">{$creatureTransaction.message}</p>
                    <p on:click={() => creatureTransaction.reset()} class="creatures__processing_closeButton">Close</p>
                {/if}
            {:else}
                <div class="creatures__processing_title">Success!</div>
                <p class="creatures__processing_message">{$creatureTransaction.message}</p>
                <a href="https://etherscan.io/tx/{$creatureTransaction.tx}" target="_BLANK" class="creatures__processing_button mt-8">View Transaction</a>
            {/if}
        </div>
    </CreaturesModal>

    <CreaturesModal isVisible={$approvalTransaction.isModalVisible} size="sm">
        <div class="creatures__processing_title">Processing</div>
        <p class="creatures__processing_message">Please wait while the transaction processes.<br />Do not refresh this page.</p>
    </CreaturesModal>

    {#if connected !== null}
        <div class="text-center">
            {#if connected}
                {#if croaksBalance !== null}
                    {#if !mintOn}
                    <div class="creatures__error">Coming soon &mdash; 4pm EST</div>
                    {:else if totalCreatureSupply === 2400}
                        <div class="creatures__error">
                            <p>Creatures are sold out.<br /><a target="_BLANK" class="underline" href="https://opensea.io/collection/swampverse-creatures">Buy on Opensea</a></p>
                        </div> 
                    {:else if croaksBalance < 450}
                        <div class="creatures__error">
                            <p>You need 450 $CROAK to fuse a creature.<br /><br />Click <a href="/croaks" class="underline cursor-pointer">here</a> to claim $CROAK.</p>
                        </div> 
                        {:else if !swampersApproved}
                        <div class="creatures__error">
                            <p>1 of 2 &mdash; <span class="underline cursor-pointer" on:click={async () => {
                                approvalTransaction.setModal(true);
                                await approveSwamper(wallet);
                                window.location.reload();
                            }}>click here</span> to approve fusing Swampverse NFTs</p>
                            <p style="font-size:8px;margin-top:15px;opacity:0.6">This is a one time transaction per wallet. If you've completed this step already, wait until your transaction finishes and refresh this page.</p>
                        </div>
                        {:else if croaksApproved < 450000000000000000000}
                        <div class="creatures__error">
                            <p>2 of 2 &mdash; <span class="underline cursor-pointer" on:click={async () => {
                                approvalTransaction.setModal(true);
                                await approveCroak(CREATURES_ADDRESS, wallet, "1000000000000000000000000");
                                window.location.reload();
                            }}>click here</span> to approve spending $CROAK for Creatures</p>
                            <p style="font-size:8px;margin-top:15px;opacity:0.6">This is a one time transaction per wallet. If you've completed this step already, wait until your transaction finishes and refresh this page.</p>
                        </div>
                    {:else}
                        <div class="creature__chooseContainer">
                            <div class="creature__chooseBox" on:click={() => creatureSelectModal = setCreatureSelectModal(1, true)}>
                            {#if creatureSelectData[1]}
                                <img class="absolute top-0 w-full h-full" src="{getSwampData(creatureSelectData[1])?.image}" />
                            {:else}
                                <p>Choose Toad<br />#1</p>
                            {/if}
                            </div>
                            <div class="creature__chooseBox" on:click={() => creatureSelectModal = setCreatureSelectModal(2, true)}>
                            {#if creatureSelectData[2]}
                                <img class="absolute top-0 w-full h-full" src="{getSwampData(creatureSelectData[2])?.image}" />
                            {:else}
                                <p>Choose Toad<br />#2</p>
                            {/if}
                            </div>
                        </div>
                    
                        <button disabled={!creatureSelectData[1] || !creatureSelectData[2]} on:click={() => {
                            creatureTransaction.setModal(true);
                            mintCreature(wallet, creatureSelectData[1], creatureSelectData[2]);
                        }}>&nbsp;</button>
                    {/if}
                {/if}
            {:else}
                <div class="creatures__error">
                    <p><span class="underline cursor-pointer" on:click={() => connect()}>Connect</span> your wallet<br />to fuse a creature.</p>
                </div>
            {/if}
        </div>
    {/if}
</Background>

<style>
    .creatures__error {
        max-width:550px;
        border-radius:5px;
        display:inline-block;
        background-color:#316152;
        padding:25px;
        font-family: "Press Start 2P",cursive;
        color:#fff;
    }

    .creature__chooseContainer {
        display:inline-block;
        text-align:center;
        margin-bottom:25px;
    }

    .creature__chooseBox {
        display:inline-block;
        position:relative;
        width:250px;
        height: 250px;
        background-color:#316152;
        border-radius:5px;
        color:rgba(255, 255, 255, 0.6);
        font-family: "Press Start 2P",cursive;
        border:8px solid rgba(95, 147, 77, 0.5);
        margin-right:25px;
    }
    .creature__chooseBox:last-child {
        margin-right:0;
    }

    @media (max-width: 530px) {
        .creature__chooseBox {
            display:block;
            margin-right:0;
            margin-bottom:10px;
        }
    }

    .creature__chooseBox:hover {
        cursor:pointer;
        border:8px solid rgba(95, 147, 77, 0.8);
        color:rgba(255, 255, 255, 0.8);
    }
    .creature__chooseBox:last-child { margin-right: 0; }
    .creature__chooseBox p {
        position:absolute;
        width:100%;
        height:100%;
        top:0;
        line-height:35px;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
    }
    .creatures__background {
        display:block;
        text-align:center;
        margin:25px auto 0 auto;
        max-width:350px;
        width:100%;
        background-size:contain;
        background-repeat: no-repeat;
    }

    .creatures__processing_title {
        color:#fff;
        font-family: "Press Start 2P",cursive;
        @apply mt-5;
        @apply text-center;
    }

    .creatures__processing_message {
        font-size:12px;
        color:#fff;
        font-family: "Press Start 2P",cursive;
        text-align:center;
        @apply mt-5;
    }

    .creatures__processing_closeButton {
        cursor:pointer;
        font-size:12px;
        color:#fff;
        font-family: "Press Start 2P",cursive;
        @apply mt-5;
        @apply underline;
    }
    .creatures__processing_closeButton:hover {
        opacity:0.9;
    }

    .creatures__processing_button {
        font-size:12px;
        color:#000;
        background-color:#fff;
        border-radius:3px;
        font-family: "Press Start 2P",cursive;
        @apply inline-block;
        @apply text-center;
        @apply p-2;
    }

    button {
        background: transparent url("/images/creatures-fuse.gif");
        background-size:contain;
        background-position: center;
        background-repeat: no-repeat;
        background-origin: content-box;
        width:150px;
        height:75px;
        display:block;
        margin: 0 auto;
    }

    button:disabled {
        cursor:not-allowed
    }
</style>