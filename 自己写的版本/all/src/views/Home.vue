<template>
<div :class="{'showAll':isHiddenHead}">
  <div class="head">
      <div class="button" @click="showBodySet">body设置</div>
      <div class="button" @click="viewAfter">发布</div>
      <div class="button hidden-button" @click="hiddenAll">{{isHiddenHead?'显示':'隐藏工具栏'}}</div>
      <div class="button">绘制模块工具</div>
      <div class="button">扩展当前组建</div>
  </div>
  <div class="body">
     <div class="trueBody"></div>
  </div>
  <allcomponents></allcomponents>
  <bodySet></bodySet>
  <!-- <layer></layer> -->
</div>
</template>
<script>
import bodySet from '@/components/all/bodySet'
import allcomponents from '@/components/component/allcomponents';
import eventHub from '@/event-hub/index';
import {  thingFlowDate } from '@/api/index';
// @ is an alias to /src
export default {
  name: 'home',
  components: {
    bodySet,
    allcomponents
  },
   data() {
      return {
          isHiddenHead: false,
          showDrawEdit: true
      }
  },
  methods: {
    viewAfter(){
       thingFlowDate.save({
          body: this.$store.state.bodySet
        }, ()=> {
       });
    },
    showBodySet(){
       eventHub.$emit(eventHub.header.SHOW_BODY_SET);
    },
    hiddenAll(){
        this.isHiddenHead = !this.isHiddenHead;
    },
    showHiddenDraw(){
       this.showDrawEdit = !this.showDrawEdit;
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
    opacity: 1;
    cursor: pointer;
  }
}
.body{
  width: 100%;
  height: 100%;
  background: #aaaaaa;
}

.trueBody{
  width: 80%;
  height: calc(100% - 20px);
  margin: 0 auto;
  position: relative;
  background: white;
}

.showAll{
  .head{
    position: fixed;
    width: 40px;
    height: 40px;
    z-index: 10;
    transition: all ease-in 0.15s 0.15s;
    div{
      display: none;
      opacity: 0;
      
    }
    .hidden-button{
      display: inline-block;
      opacity: 1;
      padding: 0px;
      width: 38px;
    }
  }
  .body{
    height: 100%;
    transition: all ease-in 0.15s;
  }
}

.hidden {
  
}
</style>