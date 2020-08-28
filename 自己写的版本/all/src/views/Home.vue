<template>
<div>
  <div class="head">
      <div class="button" @click="showBodySet">body设置</div>
      <div class="button" @click="viewAfter">发布</div>
  </div>
  <div class="body">
     <div class="trueBody"></div>
  </div>
  <bodySet></bodySet>
  <!-- <layer></layer> -->
</div>
</template>
<script>
import bodySet from '@/components/all/bodySet'
import eventHub from '@/event-hub/index';
import {  thingFlowDate } from '@/api/index';
// @ is an alias to /src
export default {
  name: 'home',
  components: {
    bodySet
  },
   data() {
      return {
          
      }
  },
  methods: {
    viewAfter(){
      console.log(this.$store.state.bodySet);
       thingFlowDate.save({
          body: this.$store.state.bodySet
        }, ()=> {

       });
    },
    showBodySet(){
       eventHub.$emit(eventHub.header.SHOW_BODY_SET);
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
    cursor: pointer;
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