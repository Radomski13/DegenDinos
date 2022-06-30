<script>
  export let left = false;
  export let right = false;
  export let label = "";
  export let amount = "";
  export let total = 0;

  if(left) right = false;
  if(right) left = false;
</script>

<div class="infoItem infoItem__{right ? "left" : ""}{left ? "right" : ""}">
  <div class="infoItem__container">
    <p>{amount}</p>
    <h3>{label}</h3>
  </div>
</div>

<style>
  .infoItem {
    width:50%;
    display:inline-block;
    font-size:16px;
    color:#fff;
  }
  .infoItem__right {
    padding-right: 10px;
  }

  .infoItem__left {
    padding-left: 10px;
  }

  .infoItem__container {
    border:5px solid #fff;
    border-radius:8px;
  }

  .infoItem__container h3 {
    font-size:24px;
    font-weight:500;
    padding:20px;
  }

  .infoItem__container p {
    float:right;
    font-size:28px;
    font-weight: 800;
    line-height:75px;
    padding-right:20px;
  }

  @media (max-width: 800px) {
    .infoItem { width: 100% }
    .infoItem__left, .infoItem__right { padding-left: 0; padding-right: 0; padding-bottom: 10px;}
  }
</style>