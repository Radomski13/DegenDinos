<script>
    export let choices = [];
    export let placeholder = "";
    export let value = "";
    export let disabled = false;
</script>

<select bind:value={value} {disabled}>
    <option disabled value>{placeholder}</option>
    {#each choices as choice}
        <option value={choice.value} disabled={choice.disabled}>
            {choice.text}
        </option>
    {/each}
</select>

<style>
    select {
        display:block;
        width:300px;
        margin:0 auto;
        padding:10px;
        border-radius:5px;
        font-family: "Press Start 2P",cursive;
        margin-bottom:5px;
        font-size:12px;
        cursor:pointer;
    }
    select:disabled {
        cursor: not-allowed;
    }
</style>