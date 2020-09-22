<template>
<div :class="{'showAll':isHiddenHead}">
  <!-- <div class="head">
      <div class="button" @click="showBodySet">body设置</div>
      <div class="button" @click="viewAfter">发布</div>
      <div class="button hidden-button" @click="hiddenAll">{{isHiddenHead?'':'隐藏工具栏'}}
        <i class="el-icon-s-tools" v-if="isHiddenHead"></i>
      </div>
      <div class="button" @click="showHiddenDraw">绘制模块工具</div>
      <div class="button">扩展当前组建</div>
      <div class="button" @click="deleteDom">删除</div>
      <div class="button" @click="editShowHidden">属性编辑</div>
  </div> -->
  <div :class="{'body':true}">
     <div class="trueBody"></div>
     <cover></cover>
  </div>
  
  <allcomponents></allcomponents>
  <bodySet ></bodySet>
  <editBox></editBox>
  <bottomList></bottomList>
  <editLayer></editLayer>
  <!-- <layer></layer> -->
  <div v-if="isShowLoading">
    <i class="el-icon-loading loading-box"></i>
  </div>
</div>
</template>
<script>
import bodySet from '@/components/all/bodySet'
import allcomponents from '@/components/component/allcomponents';
import editLayer from '@/components/all/editLayer.vue';
import editBox from '@/components/all/editBox.vue';
import bottomList from '@/components/all/bottomList.vue';
import cover from '@/components/all/cover.vue';

import eventHub from '@/event-hub/index';
import {  thingFlowDate } from '@/api/index';

// @ is an alias to /src
export default {
  name: 'home',
  components: {
    bodySet,
    editBox,
    editLayer,
    bottomList,
    allcomponents,
    cover
  },
   data() {
      return {
          isHiddenHead: true,
          iscomponentBox: false,
          isShowLoading: false
      }
  },
  created(){
    const self = this;
    eventHub.$on(eventHub.loading.LOADING_SHOW, ()=>{
      self.isShowLoading = true;
    });
    eventHub.$on(eventHub.loading.LOADING_HIDDEN, ()=>{
      self.isShowLoading = false;
    });
    thingFlowDate.saveClass({
          fileName:"flex父类",
          name: "class11",
          content: {
              Set: '',
              height: 0,
              width: 0,
              left: 0,
              top: 0,
              isWriteValue: false,
              isWriteLeft: false,
              widthSet: 'px',
              leftSet: 'px',
              inputWidth: 0,
              inputLeft: 0,
              heightSet: null,
              position: 'absolute',
              content: "",
              backgroundColor: "none",
              backgroundClip: "border-box",
              color: 'black',
              borderRadius: '0px',
              isWrap: true, //是否换行
              fontSize: 'medium',
              border: '1px dashed grey',
              borderColor: 'none',
              borderStyle: 'dashed',
              borderWidth: 1,
              zIndex: 'auto',
              display: 'inline-block',
              justifyContent: 'initial',
              alignSelf: 'initial',
              alignItems: 'stretch',
              flexDirection: 'initial',
              flex: 'initial',
              flexWrap: 'nowrap',
              order: 0,
              flexShrink: 1,
              textAlign: 'left'
          }
        }, ()=> {
            console.log("发布成功");
    });
  },
  methods: {
    viewAfter(){
      const self = this;
       var components = [];
       this.$store.state.currentDraw.forEach((item) => {
          components.push({
            style: item.style
          });
       });
       this.$store.state.bodyComponents;

      // this.$store.state.bodySet.bodyComponents
      
    },
    hiddenAll(){
        this.isHiddenHead = !this.isHiddenHead;
    },
    showHiddenDraw(){
       this.showDrawEdit = !this.showDrawEdit;
    },
    editShowHidden(){
       const self = this;
       this.isEditShow = !this.isEditShow;
       var array = this.$store.state.currentDraw;
       self.$store.state.currentChoose = [];
       array.forEach((item, key) => {
          if(item){
            if(item.isChoose){
              self.$store.state.currentChoose.push(item);
            }
          }
       });
    },
    deleteDom(){
      var array = this.$store.state.currentDraw;
      array.forEach((item, key) => {
        if(item){
          if(item.isChoose){
            item.clear();
            array[key] = null;
          }
        }
      });
      var newArray = array.filter(item => item?true:false);
      this.$store.state.currentDraw = newArray;
    }
  },
  
}
</script>
<style scoped lang="scss">
.head{
  width: 100%;
  height: 40px;
  background: #eeeeee;
  position: fixed;
  text-align: left;
  bottom: 0px;
  left: 0px;
  z-index: 10;
  opacity: 0.5;
  &:hover{
    opacity: 1;
  }
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
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  background: white;
  text-align: left;
}

.showAll{
  .head{
    position: fixed;
    width: 40px;
    height: 40px;
    z-index: 10;
    background: none;
    opacity: 1;
    font-size: 30px;
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
  width: 0px;
  height: 0px;
  overflow: hidden;
}
.loading-box{
  font-size: 55px;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 100;
  margin-top: -34px;
  margin-left: -34px;
  color: #27ae60;
}
</style>