<script>
  export let title = "";
  export let subtitle = "";
  export let backable = false;
  export let stats;
</script>


<section>
  <h2>{title}</h2>
  <p>{subtitle}</p>
  {#if backable}<a href="/staking">&larr; Go back</a>{/if}

  {#if stats?.swampersPercent && stats?.creaturesPercent }
  <br />
  <div style="font-weight:800;border-radius:3px;padding:5px 15px;color:#5F90BA;background-color:#fff;display:inline-block;margin-bottom:10px;">{stats.swampersCount} ({Math.round(100*stats?.swampersPercent)/100}%) Swampers Staked</div>
  <div style="font-weight:800;border-radius:3px;padding:5px 15px;color:#5F90BA;background-color:#fff;display:inline-block">{stats.creaturesCount} ({Math.round(100*stats?.creaturesPercent)/100}%) Creatures Staked</div>
  {/if}
  
</section>


<style>

  section {
    margin-top:25px;
    text-align:center;
  }

  h2 {
    font-family: "Press Start 2P", Arial;
    color:#fff;
    font-size:18px;
  }

  p, a {
    font-size:14px;
    color: #eee
  }
</style>