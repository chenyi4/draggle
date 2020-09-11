<template>
    <div :class="{'editLayer':true}"> 
        <!-- , -->
        <div class="editLayer-Head">
        </div>
        <div class="editLayer-body">
            <div class="show-box">
                <div class="line">
                    <div class="left">宽度</div>
                    <div class="right">{{form.trueWidth}}</div>
                </div>
                <div class="line">
                    <div class="left">高度</div>
                    <div class="right">{{form.height}}</div>
                </div>
                <div class="line">
                    <div class="left">左边距</div>
                    <div class="right">{{form.left}}</div>
                </div>
                <div class="line">
                    <div class="left">顶边距</div>
                    <div class="right">{{form.top}}</div>
                </div>
            </div>
            <el-form ref="form" :model="form" label-width="120px" size="mini">
                 <el-form-item label="position">
                    <el-radio-group v-model="form.position" @input="changeValue('position')">
                        <el-radio  :label="'relative'">relative</el-radio><br/>
                        <el-radio  :label="'absolute'">absolute</el-radio><br/>
                        <el-radio  :label="'fixed'">fixed</el-radio><br/>
                        <el-radio  :label="'inherit'">inherit</el-radio><br/>
                        <el-radio  :label="'initial'">initial</el-radio><br/>
                        <el-radio  :label="'static'">static</el-radio><br/>
                        <el-radio  :label="'sticky'">sticky</el-radio><br/>
                        <el-radio  :label="'unset'">unset</el-radio><br/>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="宽度输值">
                    <el-radio-group v-model="form.isWriteValue" @input="changeValue('widthSet')">
                        <el-radio  :label="false">默认</el-radio><br/>
                        <el-radio  :label="true">启用输入值</el-radio><br/>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="宽度模式" >
                    <el-radio-group v-model="form.widthSet" @input="changeValue('widthSet')">
                        <el-radio  :label="'px'">像素分变量px</el-radio><br/>
                        <el-radio  :label="'%'">百分比模式%</el-radio><br/>
                        <el-radio  :label="''" :disabled="!form.isWriteValue">calc()计算模式</el-radio><br/>
                        <el-radio  :label="'rem'" :disabled="!form.isWriteValue">rem相对于根元素html的字体大小</el-radio><br/>
                        <el-radio  :label="'vw'" :disabled="!form.isWriteValue">vw相对于视口的宽度（1vw 等于1/100的视口宽度）</el-radio><br/>
                        <el-radio  :label="'vh'" :disabled="!form.isWriteValue">vh相对于视口的高度（1vh 等于1/100的视口高度）</el-radio><br/>
                        <el-radio :label="'vmin'" :disabled="!form.isWriteValue">vmin (关于视口高度和宽度两者的最小值)</el-radio><br/>
                        <el-radio :label="'vmax'" :disabled="!form.isWriteValue">vmax (关于视口高度和宽度两者的最大值)</el-radio><br/>
                    </el-radio-group>
                </el-form-item>
                 <el-form-item label="宽度" v-if="form.isWriteValue">
                    <el-input v-model="form.inputWidth" @input="changeValue('widthValue')"/> {{form.widthSet}}
                </el-form-item>
                <!-- <el-form-item label="宽度" >
                    <el-input v-model="form.width" :disabled="true"/> px
                </el-form-item>
                <el-form-item label="高度" >
                    <el-input v-model="form.height" :disabled="true"/> px
                </el-form-item>  
                <el-form-item label="左边距" >
                    <el-input v-model="form.left" :disabled="true"/>    px
                </el-form-item>
                <el-form-item label="顶边距" >
                    <el-input v-model="form.top" :disabled="true"/>    px
                </el-form-item>  -->

                 <!-- 保存此样式为class
                <el-form-item label="模式" >
                    <el-radio-group v-model="form.Set">
                        <el-radio  :label="1">css模式</el-radio><br/>
                        <el-radio  :label="2">flex模式</el-radio>
                    </el-radio-group>
                </el-form-item>  
               
                
                <el-form-item label="宽度" >
                    <el-input v-model="form.width"/>    {{form.widthSet}}
                </el-form-item>
                <el-form-item label="高度模式" >
                    <el-radio-group v-model="form.heightSet">
                        <el-radio  :label="'px'">像素分变量px</el-radio><br/>
                        <el-radio  :label="'%'">百分比模式%</el-radio><br/>
                        <el-radio  :label="''">calc()计算模式</el-radio><br/>
                        <el-radio  :label="'rem'">rem相对于根元素html的字体大小</el-radio><br/>
                        <el-radio  :label="'vw'">vw相对于视口的宽度（1vw 等于1/100的视口宽度）</el-radio><br/>
                        <el-radio  :label="'vh'">vh相对于视口的高度（1vh 等于1/100的视口高度）</el-radio><br/>
                        <el-radio :label="'vmin'">vmin (关于视口高度和宽度两者的最小值)</el-radio><br/>
                        <el-radio :label="'vmax'">vmax (关于视口高度和宽度两者的最大值)</el-radio><br/>
                    </el-radio-group>
                </el-form-item> 
                <el-form-item label="高度" >
                    <el-input v-model="form.height"/>   {{form.heightSet}}
                </el-form-item>  
                <el-form-item label="左边距" >
                    <el-input v-model="form.left"/>    px
                </el-form-item>
                <el-form-item label="顶边距" >
                    <el-input v-model="form.top"/>    px
                </el-form-item>         -->
                <!-- <el-form-item label="宽度显示" v-if="form.widthSet!=1">
                    <el-radio-group v-model="form.widthShow">
                        <el-radio  :label="1">百分比</el-radio>
                        <el-radio  :label="2">定宽</el-radio>
                    </el-radio-group>
                </el-form-item> -->
             </el-form>
             <div class="box"></div>
        </div>
        <div class="before"></div>
    </div>
</template>
<script>
import drag from '@/assets/js/drag3.js';
import scaleCY from '@/assets/js/scale.js';
import eventHub from '@/event-hub/index';
export default {
  name: 'editLayer',
  components: {

  },
  props: {
      isShow: {
           type: Boolean,
      }
  },
  data() {
      return {
          show: false,
          formSet: {
              Set: '',
              height: 0,
              width: 0,
              left: 0,
              top: 0,
              isWriteValue: false,
              widthSet: 'px',
              inputWidth: 0,
              heightSet: null,
              position: ''
          },
          form: {
             
          },
          currentChoose: null
      }
  },
  created(){
      const self = this;
      this.$nextTick(() => {
          var dragDom = drag({
              select: 'editLayer-Head',
              moveSelect: 'editLayer'
          });
          scaleCY(dragDom.moveDom);
      });
      /**显示通用样式 */
      eventHub.$on(eventHub.header.SHOW_editShow, (value) => {
        if(typeof(value) == 'boolean'){
            self.show = !self.show;
        }
        else{
            self.show = !self.show;
        }
        
        if(self.show){
            self.showDom();
        }
      });
      
      eventHub.$on(eventHub.editBox.SELECT_CHOOSE_DOM, (obj) => { //当页面选中组件的时候
          self.currentChoose = obj;
          self.setOrg();
      });
    //   editShow
  },
  methods: {
      showDom(){
          setTimeout(function(){
              var dragDom = drag({
                select: 'editLayer-Head',
                moveSelect: 'editLayer',
              });
              scaleCY(dragDom.moveDom);
          },20);
      },
      setOrg(value){
          const self = this;
          if(self.currentChoose.length > 1) 
          {
               self.clearParam();
               return false;
          }  
         
          var objData  = self.currentChoose[0];
          self.form = {};
          if(objData){
            if(objData.scale){
                self.form = Object.assign(self.formSet, objData.style);
            }
          }
          if(value){
              self.form = value;
          }
        //   self.form = JSON.parse(JSON.stringify(self.form));
      },
      clearParam(){
          this.form = {
              position: ''
          };
      },
      changeValue(value){
          const self = this;
          switch(value){
              case 'widthSet':
                    self.setWidth('widthSet');
                    break;
              case 'widthValue':
                    self.setWidth('widthValue');
                    break;
          }

          if(self.currentChoose){
              self.currentChoose.forEach((item) => {
                  item.change(self.form);
              });
          }
      },
      setWidth(VALUE){
          const self = this;
          if(VALUE == "widthSet"){
                var allWidth = (document.getElementsByClassName('trueBody')[0]).offsetWidth;
                if(self.currentChoose){
                    if(!self.form.isWriteValue){
                            if(self.form.widthSet == '%'){
                                if(self.form.width == self.form.trueWidth){
                                self.form.width = (self.form.width/allWidth)*100 +'%';
                                }
                            }else if(self.form.widthSet == 'px'){
                                if(self.form.width == self.form.trueWidth){

                                }else{
                                    self.form.width = self.form.trueWidth;
                                }
                            }else{
                                self.form.widthSet = 'px';
                                self.form.width = self.form.trueWidth
                            }
                    }else{
                        //self.form.inputWidth = self.form.width.replace(/\%/, '');
                        var stringType = typeof(self.form.width);
                        if(stringType == "number"){
                            self.form.inputWidth = self.form.width;
                        }else{
                            self.form.inputWidth = self.form.width.replace(/\%/g, '');
                        }
                        //   self.form.inputWidth = self.form.width.replace(/\%/, '');
                        //   self.form.width = self.form.inputWidth + self.form.widthSet;
                        // .replace('px', '').replace('%', '');
                    }
                }  
          }else if(VALUE == "widthValue"){

          }
      }
  },
  watch: {
      isShow(value){
          if(value){
               const self = this;
               self.currentChoose = null;
               self.setOrg();
          }
      },
      form: {
          deep: true,
          handler(newName, oldName) {
              const self = this;
              
          }
      }
  }
}
</script>
<style scoped lang="scss">
.editLayer, .editLayer-box{
    width: 564px;
    height: 764px;
    background: #eeeeee;
    position: fixed;
    left: calc(100% - 574px);
    top: calc(100% - 774px);
    overflow: hidden;
    .editLayer-Head{
        width: 100%;
        height: 30px;
        background: black;
        cursor: pointer;
    }
    .editLayer-body{
        width: 100%;
        text-align: left;
        overflow: auto;
        padding-top: 20px;
        height: calc(100% - 30px);
        .el-input {
            width: 300px;
        }
        .show-box{
            width: 80%;
            padding: 5px;
            border: 1px solid #c9c8c8;
            margin: 0 auto;
            border-right: none;
            border-left: none;
            margin-bottom: 12px;
            .line{
                font-size: 14px;
                color: #939191;
                .left,.right{
                    width: 50%;
                    box-sizing: border-box;
                    padding-right: 15px;
                    text-align: right;
                    line-height: 28px;
                    display: inline-block;
                }
                .right{
                    display: inline-block;
                    text-align: left;
                }
            }
        }
    }

}
.editLayer-ed{
    // left: 120%;
    // top: -200%;
}
.box{
    position: absolute;
    left: 100%;
    width: 50%;
    height: 100%;
    top: 0;
    display: none;
    background: white;
}
</style>