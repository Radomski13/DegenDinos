<script>
    import { onMount } from "svelte";
    import Header from "../components/Header.svelte";
    
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

<Header />
<div style="height:65px;">&nbsp;</div>
<slot />