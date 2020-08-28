<template>
  <div class="layer">
      <div class="center"></div>
  </div>
</template>

<style lang="scss">
.layer{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    position: fixed;
    left: 0px;
    top: 0px;
    .center{
      width: 80%;
      height: 90%;
      position: absolute;
      left: 10%;
      top: 5%;
      background: white;
    }
}
</style>