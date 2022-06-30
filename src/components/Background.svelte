<script>
    export let imageUrl = "";
    export let showOverlay = false;
    export let position = "top center";
    export let opacity = 1;

    const OVERLY = 'linear-gradient(to bottom,rgba(50, 102, 147, 0) 0%, rgba(50, 102, 147, 0.8) 99%),'
</script>

<section style='opacity:{opacity};background-position:{position};background-image:{showOverlay ? OVERLY : ''}url("{imageUrl}");'>
    <slot />
</section>

<style>
section {
    position:fixed;
    height:0;
    width:100%;
    height:calc(100% - 65px);
    height: -moz-calc(100% - 18px);
    height: -webkit-calc(100% - 18px);
    height: -o-calc(100% - 18px);
    background-repeat: no-repeat;
    background-size: cover;
    overflow-y:scroll;
    padding-bottom:25px;
}
</style>