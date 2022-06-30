<script>
    export let placeholder = "";
    export let value;
    export let required = false;
</script>

<input type="text" placeholder={placeholder} bind:value {required} />

<style>
    input {
        background-color:#2D5E8A;
        font-family: "Roboto", sans-serif;
        color:#fff;
        padding:5px;
        width:100%;
        border-radius:3px;
        border:1px solid transparent;
        margin-bottom:5px;
        font-size:12px;
    }
    input:focus {
        outline: none;
    }
</style>