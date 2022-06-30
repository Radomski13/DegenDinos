<script>
    import { params } from "@roxi/routify";
    import { getBalance, claim } from "./utils";
    import { isConnected, getWallet, connect, truncateWallet } from "../../utils/web3";
    import { CROAKENS_ADDRESS } from "../../utils/constants";
    import { getAirdropAmount, getClaimedStatus } from "../../utils/merkel";
    import Modal from "../../components/TransactionModal.svelte";
    import Background from "../../components/Background.svelte";
    import { transactionStatus } from "./store";

    $: connected = null;
    $: wallet = null;


    $: croaksBalance = null;
    $: isModalVisible = false;

    $: airdropAmount = 0;
    $: claimStatus = false;

    const setInitialData = async () => {

       connected = await isConnected();

       if(connected) {
         wallet = await getWallet();
         airdropAmount = await getAirdropAmount(wallet);
         claimStatus = await getClaimedStatus(wallet);
         croaksBalance = await getBalance(wallet);
       }
    }

    setInitialData();

    const addToMetamask = async () => {
      const tokenSymbol = 'CROAK';
      const tokenDecimals = 18;
      const tokenImage = 'https://swamps.io/images/coin.gif';

      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: CROAKENS_ADDRESS, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
        });
      } catch (error) { }
    }
</script>

<Background imageUrl="/images/croaks-bg.png" showOverlay>

    <Modal 
        title={$transactionStatus.title}
        message={$transactionStatus.message}
        buttonText={$transactionStatus.buttonText}
        tx={$transactionStatus.tx}
        isVisible={isModalVisible}
        on:buttonClick={() => {
            isModalVisible = false;
        }}
    />

    <div class="croaks-circulation">
        {#if connected}
            <div class="croaks-wallet-container">
                <div class="croaks-wallet-container__item">
                    <div><a target="_BLANK" href="https://etherscan.io/address/{wallet}">{truncateWallet(wallet)}</a></div>
                    <p>Wallet Profile</p>
                </div>
                <div class="croaks-wallet-container__item">
                    <div><a target="_BLANK" href="https://etherscan.io/address/{wallet}">{croaksBalance?.toLocaleString() || 0}</a></div>
                    <p>$CROAK Balance</p>
                </div>
            </div>

            <div class="text-center">
              <button on:click={() => addToMetamask()}>Add $CROAK to Metamask</button>
            </div>
        {/if}
    </div>

    {#if connected !== null}
        <div class="croaks-connect">
            {#if connected}
            <div class="croaks-connect__claimable">{claimStatus ? 0 : airdropAmount?.toLocaleString() || 0}</div>
            <div class="croaks-connect__claimable_subtext">Claimable $croak</div>

            {#if !claimStatus && airdropAmount > 0}
            <button on:click={() => {
                transactionStatus.reset();
                claim(wallet);
                isModalVisible = true;
            }}>Claim</button>
            {/if}
            {:else}
                <div>Connect your wallet<br />to access your $CROAK</div>
                <button on:click={() => connect()}>Connect</button>
            {/if}
        </div>
    {/if}
</Background>

<style>
    div {
        font-family: "Press Start 2P",cursive;
        font-size:12px;
    }

    .croaks-circulation {
        max-width:500px;
        width:90%;
        margin:25px auto 0 auto;
        border:1px solid red;
        padding:20px;
        background-image: url("/images/croaks-green-bg.png");
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        color: #fff;
        border: 1rem solid transparent;
        border-image: url("/images/croaks-border.png") 100 round;
    }

    .croaks-circulation button {
      background-color:#fff;
      border-radius:3px;
      color:#333;
      padding:5px;
      font-size:8px;
      margin-top:15px;
    }

    .croaks-circulation__subtext {
        font-size:8px;
        text-align:center;
        margin-top:15px;
    }

    .croaks-connect {
        max-width:350px;
        width:90%;
        margin:25px auto 0 auto;
        padding:50px 20px;
        border:1px solid red;
        background-image: url("/images/croaks-connect-bg.png");
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        color: #fff;
        border: 1rem solid transparent;
        border-image: url("/images/croaks-connect-border.png") 100 round;
        text-align:center;
    }

    .croaks-connect button {
        color:#000;
        background-color:#fff;
        border-radius:2px;
        padding:5px;
        margin-top:15px;
    }

    .croaks-connect__claimable {
        font-size:18px;
        display:inline-block;
        border-bottom:1px solid #fff;
    }

    .croaks-connect__claimable_subtext {
        font-size:8px;
        margin-top:15px;
    }

    .croaks-wallet-container {
        font-size:0;
    }

    .croaks-wallet-container__item {
        width:50%;
        display:inline-block;
        text-align:center;
        font-size:14px
    }

    .croaks-wallet-container__item p {
        font-size:8px;
        display:inline-block;
        text-align:center;
        padding-top:5px;
        margin:5px auto 0 auto;
        border-top:1px solid #fff
    }

    @media (max-width: 450px) {
        .croaks-wallet-container__item {
            display:block;
            width:100%;
            margin-bottom:15px;
        }
        .croaks-wallet-container__item:last-child {
            margin-bottom:0;
        }
    }
</style>