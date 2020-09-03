<template>
  <div class="layer" v-if="isShow">
      <div class="center">
        <slot></slot>
        <el-button @click="sure">确认</el-button>
      </div>
  </div>
</template>
<script>
export default {
  name: 'layer',
  props: {
    clickSure: {
        type: Function,
        default: null
    },
    isShow: {
        type: Boolean,
        default: false
    }
  },
  components: {
  },
   data() {
      return {
          show: true,
      }
  },
  methods: {
    sure(){
        this.clickSure('sss');
    }  
  },
  created(){
  
  },
  watch: {
     isShow: (value) => {
      }
  }
}
</script>
<style lang="scss">
.layer{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 11;
    .center{
      width: 80%;
      height: 90%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding-bottom: 60px;
    }
}
</style>