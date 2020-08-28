<template>
<div>
  <div class="head">
      <div class="button">body设置</div>
      <div class="button" @click="viewAfter">预览</div>
  </div>
  <div class="body">
     <div class="trueBody"></div>
  </div>
  <!-- <layer></layer> -->
</div>
</template>
<script>
// import layer from '@/components/all/layer'
// @ is an alias to /src
export default {
  name: 'home',
  components: {
    // layer
  },
   data() {
      return {
        
      }
  },
  methods: {
    viewAfter(){
       
    }
  },
  created(){
   
  },
}
</script>
<style scoped lang="scss">
.head{
  width: 100%;
  height: 40px;
  background: #eeeeee;
  text-align: left;
  .button{
    width: 130px;
    line-height: 40px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
  }
}
.body{
  width: 100%;
  height: calc(100% - 40px);
  background: #aaaaaa;
}

.trueBody{
  width: 80%;
  height: calc(100% - 20px);
  margin: 0 auto;
  position: relative;
  top: 10px;
  background: white;
}
</style>