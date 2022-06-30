<script>
    import Card from "../../components/Card.svelte";
    import Input from "../store/_components/Input.svelte";
    import CountrySelect from "../store/_components/CountrySelect.svelte";
    import { storeWallet } from "../../stores/store";
    import WalletSignatureCheck from "../../components/WalletSignatureCheck.svelte";
    import { isConnected, getWallet, verifySignature } from "../../utils/web3";

    $: connected = null;
    $: wallet = null;
    $: name = "";
    $: address1 = "";
    $: address2 = "";
    $: postal_code = "";
    $: city = "";
    $: state = "";
    $: country = "United States of America";
    $: saving = false;

    const retrieveAddress = async () => {
        connected = await isConnected();

        if(connected) {
            const localStorageSignature = await localStorage.getItem("signature");
            if(localStorageSignature) storeWallet.setWalletSignature(localStorageSignature);
            wallet = await getWallet();

            //verify that the wallet signature equals current wallet
            if($storeWallet.walletSignature) {
                const verifySignatureVsWallet = await verifySignature($storeWallet.walletSignature, wallet);
                if(!verifySignatureVsWallet) storeWallet.reset();
            }

            if($storeWallet.walletSignature) {
                const getAccount = await (await fetch("https://api.swamps.io/account", { method: 'GET', headers: { "X-API-KEY": $storeWallet.walletSignature } })).json();
                storeWallet.setAddress(getAccount.address);
                storeWallet.setOrders(getAccount.orders);

                name = $storeWallet.address?.name || "";
                address1 = $storeWallet.address?.address1 || "";
                address2 = $storeWallet.address?.address2 || "";
                postal_code = $storeWallet.address?.postal_code || "";
                city = $storeWallet.address?.city || "";
                state = $storeWallet.address?.state || "";
                country = $storeWallet.address?.country || "United States of America";

            }
        }
    }
    retrieveAddress();

    const saveAddress = async () => {
        try {
            if(!saving) {
                saving = true;
                const saveAccount = await (await fetch("https://api.swamps.io/account/address", { 
                    method: 'POST',
                    headers: { "X-API-KEY": $storeWallet.walletSignature, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, address1, address2, postal_code, city, state, country })
                })).json();
                
                if(saveAccount.result === "success")
                    window.location.reload()
                else saving = false;
            }
        }
        catch {
            saving = false;
        }
    }

</script>

<Card>
    <div>Update Shipping Address</div>
    <a style="font-size:10px;display:inline-block;margin-bottom:10px" href="#" on:click={() => history.back()}>⇠ Go Back</a>

    <WalletSignatureCheck>
        <form on:submit|preventDefault={() => saveAddress()}>
            <Input placeholder="Name" bind:value={name} required />
            <Input placeholder="Address Line 1" bind:value={address1} required />
            <Input placeholder="Address Line 2" bind:value={address2}  />
            <div style="font-size:0;">
                <div style="display:inline-block;width:33.3%;padding-right:2.5px;"><Input placeholder="City" bind:value={city} required /></div>
                <div style="display:inline-block;width:33.3%;padding-left:2.5px;padding-right:2.5px;"><Input placeholder="State" bind:value={state} required /></div>
                <div style="display:inline-block;width:33.3%;padding-left:2.5px;"><Input placeholder="Postal Code" bind:value={postal_code} required /></div>
            </div>
            
            <CountrySelect bind:value={country} />
            <button type="submit">{saving ? "Saving.." : "Save" }</button>
        </form>
    </WalletSignatureCheck>
</Card>

<style>
    p {
        line-height: 1.3rem;
        font-family: "Roboto",sans-serif;
        margin-bottom:10px;
    }
    button {
        margin-top:15px;
        color:#336693;
        background-color:#fff;
        border-radius:3px;
        width:100%;
        padding:10px;
        font-size:12px;
    }
</style>