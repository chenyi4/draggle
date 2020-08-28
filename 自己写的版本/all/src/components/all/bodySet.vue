<template>
<layer :clickSure="clickSure" :isShow.sync="showBody">
    <div class="bodyset">
        <el-form ref="form" :model="form" label-width="120px" size="mini">
            <!-- <el-form-item label="宽度设置+++++++++">
            </el-form-item>   -->
            <el-form-item label="宽度模式" >
                 <el-radio-group v-model="form.widthSet">
                    <el-radio  :label="1">全屏</el-radio>
                    <el-radio  :label="2">设置值</el-radio>
                 </el-radio-group>
            </el-form-item>   
            <el-form-item label="宽度显示" v-if="form.widthSet!=1">
                 <el-radio-group v-model="form.widthShow">
                    <el-radio  :label="1">百分比</el-radio>
                    <el-radio  :label="2">定宽</el-radio>
                 </el-radio-group>
            </el-form-item>
            <el-form-item label="宽度" v-if="(form.widthSet == 2 && form.widthShow)||form.widthSet == 1">
                 <el-radio-group >
                    <el-input v-model="form.width" :disabled="form.widthSet==1"></el-input>
                 </el-radio-group>  <span>{{(form.widthShow==1)||form.widthSet==1?'%':'px'}}</span>
            </el-form-item> 
            <el-form-item label="高度模式">
                 <el-radio-group v-model="form.heightSet">
                    <el-radio  :label="1">全屏</el-radio>
                    <el-radio  :label="2">设置值</el-radio>
                    <el-radio  :label="3">自适应</el-radio>
                    <el-radio  :label="4">自己输</el-radio>
                 </el-radio-group>
            </el-form-item>   
            <el-form-item label="高度显示" v-if="form.heightSet==2">
                 <el-radio-group v-model="form.heightShow">
                    <el-radio  :label="1">百分比</el-radio>
                    <el-radio  :label="2">定高</el-radio>
                 </el-radio-group>
            </el-form-item>
            <el-form-item label="高度" >
                 <el-radio-group >
                    <el-input v-model="form.height" :disabled="form.heightSet==1"></el-input>
                 </el-radio-group>  <span>{{(form.heightSet==1)||(form.heightSet==2 && form.heightShow == 1)?'%':'px'}}</span>
            </el-form-item> 
            <!-- <el-form-item label="基础颜色设置+++++++++">
            </el-form-item> -->
             <el-form-item label="背景颜色选择">
                  <el-popover
                    placement="right-start"
                    title="背景色"
                    width="40"
                    trigger="hover"
                   >
                   <el-color-picker v-model="form.backgroundColor" size="mini"></el-color-picker>
                    <el-button slot="reference">
                        <div class="cube" :style="'background:'+form.backgroundColor"></div>
                        {{form.backgroundColor}} 
                    </el-button>
                </el-popover>
            </el-form-item>
            <el-form-item label="画布颜色选择">
                <el-popover
                    placement="right-start"
                    title="画布色"
                    width="40"
                    trigger="hover"
                   >
                   <el-color-picker v-model="form.bodyColor" size="mini"></el-color-picker>
                    <el-button slot="reference">
                        <div class="cube" :style="'background:'+form.bodyColor"></div>
                        {{form.bodyColor}} 
                    </el-button>
                </el-popover>
            </el-form-item>
             
        </el-form>
        <!-- <div>宽度设置</div>
        <div>是否全屏</div>
        <div>设置宽度</div>
        <div>绝对值/百分比 ***px/100%</div> -->

        <!-- <div>确定</div> -->
    </div>
</layer>
</template>
<script>
import layer from '@/components/all/layer';
import eventHub from '@/event-hub/index';
export default {
  name: 'bodyset',
  components: {
    layer
  },
   data() {
      return {
          form: {
              widthSet: 1,
              widthShow: 1,
              width: 100,
              backgroundColor: '#AAAAAA',
              bodyColor: '#FFFFFF',
              heightSet: 1,
              heightShow: 1,
              height: 100
          },
          outSet: {
              width: '100%',
              bodyColor: '#AAAAAA',
              height: "100%",
              mainColor: "#FFFFFF"
          },
          showBody: false
      }
  },
  methods: {
      clickSure(value){
          this.showBody = false;
          this.$store.state.bodySet = this.outSet;
      },
      setOutSet(){
          //宽度
          if(this.form.widthSet == 1){
              this.outSet.width = '100%'
          }else if(this.form.widthSet == 2){
              if(this.form.widthShow == 1){
                  this.outSet.width = this.form.width+'%';
              }else{
                  this.outSet.width = this.form.width+'px';
              }
          }
          //高度设置
          if(this.form.heightSet == 1){
              this.outSet.height = '100%';
          }else if(this.form.heightSet == 2){
              if(this.form.heightShow == 1){
                  this.outSet.height = this.form.height+'%';
              }else if(this.form.heightShow == 2){
                  this.outSet.height = this.form.height+'px';
              }
          }


          //背景色
          this.outSet.bodyColor = this.form.backgroundColor;
          
          //主色
          this.outSet.mainColor = this.form.bodyColor;
      }
  },
  created(){
      const self = this;
      eventHub.$on(eventHub.header.SHOW_BODY_SET, () => {
          self.showBody = true;
      });
  },
  watch: {
      form: {
          handler(newName, oldName) {
                if(newName.widthSet == 1){
                    this.form.width = 100;
                }

                if(newName.heightSet == 1){
                    this.form.height = 100;
                }
                this.setOutSet();
          },
          deep: true
      }
  }
}
</script>
<style scoped lang="scss">
.bodyset{
    width: 100%;
    height: 100%;
    overflow: auto;
    font-size: 16px;
    text-align: left;
    padding: 20px;
    box-sizing: border-box;
}
.el-radio-group{
    position: relative;
    // top: 5px;
}
.cube{
    width: 10px;
    height: 10px;
    background: white;
    display: inline-block;
    position: relative;
    top: 1px;
    margin-left: 0px;
    margin-right: 3px;
    border: 1px solid grey;
}
</style>