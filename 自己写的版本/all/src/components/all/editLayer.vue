<template>
    <div class="editLayer" v-if="show">
        <div class="editLayer-Head">
        </div>
        <div class="editLayer-body">
            <div class="show-box">
                <div class="line">
                    <div class="left">宽度</div>
                    <div class="right">{{form.width}} px</div>
                </div>
                <div class="line">
                    <div class="left">高度</div>
                    <div class="right">{{form.height}} px</div>
                </div>
                <div class="line">
                    <div class="left">左边距</div>
                    <div class="right">{{form.left}} px</div>
                </div>
                <div class="line">
                    <div class="left">右边距</div>
                    <div class="right">{{form.top}} px</div>
                </div>
            </div>
             <el-form ref="form" :model="form" label-width="120px" size="mini">
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
                <el-form-item label="position">
                    <el-radio-group v-model="form.position">
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
                <el-form-item label="宽度模式" >
                    <el-radio-group v-model="form.widthSet">
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
          show: true,
          form: {
              Set: '',
              height: 0,
              width: 0,
              left: 0,
              top: 0,
              widthSet: null,
              heightSet: null,
              position: ''
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
            self.show = value;
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
          var objData  = self.currentChoose[0];
          self.form = {};
          if(objData){
            if(objData.scale){
                self.form = objData.style;
                objData.setPrint = self.setOrg;
            }
          }
          if(value){
              self.form = value;
          }
          self.form = JSON.parse(JSON.stringify(self.form));
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
              if(self.currentChoose){
                  //self.currentChoose.change(newName);
              }
          }
      }
  }
}
</script>
<style scoped lang="scss">
.editLayer{
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