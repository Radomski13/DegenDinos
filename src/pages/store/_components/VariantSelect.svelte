<script>
    import Select from "./Select.svelte";
    export let colors = [];
    export let sizes = [];
    export let size = undefined;
    export let color = undefined;
    export let variants = [];

    const parseSizes = (color) => {
        if(!color) return sizes;
        return sizes.map(s => {
            const sizeAndColor = variants.find(v => v.color === color && v.size === s);
            const quantity = Number(sizeAndColor.quantity);
            let text = s.toUpperCase();
            if(quantity === 0) text = text + " (Sold Out)";
            return { value: s, text, disabled: quantity === 0}
        })
    }

    const upperCase = (string) => string.charAt(0).toUpperCase() + string.slice(1);
</script>

<Select choices={colors.map(c => { return { value: c, text: upperCase(c), disabled: false}})} bind:value={color} placeholder="Choose a color" />
<Select choices={parseSizes(color)} disabled={!color} bind:value={size} placeholder="Choose a size" />
