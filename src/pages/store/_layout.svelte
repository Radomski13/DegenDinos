<script>
	import { onMount } from 'svelte';
  import { isStoreReleased } from "../../utils/helpers";

	onMount(async () => {
    if(!isStoreReleased()) window.location.replace("/");
	});
</script>

<slot />
