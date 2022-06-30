<div>
  <slot />
</div>

<style>
div {
  max-width:1200px;
  width:90%;
  margin:0 auto 20px auto;
  font-size:0;
}

@media (max-width: 800px) {
  div {
    margin-bottom:0;
  }
}
</style>