<script>
    export let imageUrl = "";
    export let showOverlay = false;
    export let position = "top center";
    export let opacity = 1;
    export let backgroundColor = null;

    const OVERLY = 'linear-gradient(to bottom,rgba(50, 102, 147, 0) 0%, rgba(50, 102, 147, 0.8) 99%),'
</script>

{#if backgroundColor}
<div style="background-color:{backgroundColor}" />
{/if}


<section style='opacity:{opacity};background-position:{position};background-image:{showOverlay ? OVERLY : ''}url("{imageUrl}");'>
  <slot />
</section>

<style>
section {
  z-index:-1;
  top:0;
  position:fixed;
  height:0;
  width:100%;
  height:100%;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y:scroll;
  padding-bottom:25px;
}

div {
  z-index:-2;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
</style>