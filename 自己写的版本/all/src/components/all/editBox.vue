<template>
    <div :class="{'edit-box':true, 'edit-box-ed': !isShowAll}" v-if="show">
        <div>
             <!-- v-if="isShowAll" -->
            <el-tooltip :class="{'item':true}" effect="dark" :content="isUseTip?'关闭提示':'显示提示'" placement="left">
                <div :class="{'icon-box':true, 'icon-box-dis': !isUseTip, 'div-block-hidden': !isShowAll}" @click.stop="isUseTip = !isUseTip;">
                    <div class="icon"></div>
                </div>
            </el-tooltip>
            <div :class="{'div-block':true}">
                <el-tooltip 
                    v-for="(item, key) in array"  
                    :key="key"
                    :disabled ="!isUseTip"
                    class="item" effect="dark" :content="item.name" placement="left">
                    <i
                        :class="[item.class, isShowAll?'':'div-block-hidden']"
                        @click.stop="clickButton(key)"
                        >
                    </i>
                </el-tooltip>
            </div>
        </div>
        <i class="el-icon-s-grid no-padding" v-if="!isShowAll" @click.stop="showAll"></i>
        <div class="cover" v-if="isShowCover"></div>
    </div>
</template>
<script>
import drag from '@/assets/js/drag3.js';
import eventHub from '@/event-hub/index';
export default {
  name: 'home',
  components: {
    
  },
   data() {
      return {
          array: [
              {
                  name: "删除选中组件",
                  disabled: true,
                  class: "el-icon-delete-solid"
              },
              {
                  name: "选择组件",
                  disabled: false,
                  class: "el-icon-plus"
              },
              {
                  name: "锁定选中组件",
                  disabled: false,
                  class: "el-icon-attract"
              },
              {
                  name:　"编辑选中组件",
                  disabled: false,
                  class: "el-icon-s-open"
              },
              {
                  name: "全屏隐藏多余菜单",
                  disabled: false,
                  class: "el-icon-full-screen"
              },
              {
                  name: "缩小此菜单",
                  disabled: false,
                  class: "el-icon-arrow-up"
              }
          ],
          isUseTip: true, //是否显示提示
          isShowAll: true, //是否显示所有模块
          isShowCover: false, //是否显示遮挡层
          orgIsUseTip: null,
          show: true
      }
  },
  methods: {
      clickButton(key){
          const self = this;
          if(!this.isShowAll) return false; 
          if(key == 5){
              this.isShowAll = false;
          }else if(key == 0){
              //删除组件
              self.deleteDom();
          }else if(key == 1){
              self.selectDom();
          }else if(key == 2){
              self.lockDom();
          }else if(key == 3){
              self.editDom();
          }else if(key == 4){
              self.scale();
          }
      },
      deleteDom(){
          console.log("删除组件");
      },
      selectDom(){
          console.log("选中组件");
      },
      lockDom(){
          console.log("锁定组件");
      },
      editDom(){
          console.log("编辑组件");
      },
      scale(){
          console.log("全屏显示画布隐藏多余菜单");
      },
      showAll(){
          this.isShowAll = true;
      }
  },
  created(){
      const self = this;
      var dragDom;
      this.$nextTick(() => {
          
           dragDom = drag({
                select: 'edit-box',
                orgMove: function(){
                    if(!self.isShowCover){
                        self.isShowCover = true;
                    }
                },
                stop: function(){
                    self.isShowCover = false;
                }
          });
      });
      eventHub.$on(eventHub.header.SHOW_editBox, () => {
        self.show = !self.show;
      });
  }
}

</script>

<style scoped lang="scss">
$color: #cddc39;
$number:5;
.edit-box{
    width: 50px;
    height: auto;
    background-color: rgba(0,0,0,0.6);
    position: fixed;
    right: 12px;
    top: 9px;
    padding: 20px 0px;
    padding-top: 15px;
    padding-bottom: 15px;
    transition: background-color ease-in-out 0.7s, width ease-in-out 0.2s 0.7s;
    .cover{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
    }
    .icon-box{
        height: 5px;
        padding: 5px 20px 5px 20px;
        transition: all ease 0.2s (0.12s*($number+1));
        margin-bottom: 15px;
        cursor: pointer;
        &:hover{
           .icon{
               background: $color;
           } 
        }
    }
    .icon-box-dis{
        .icon{
            background: white;
        } 
    }
    .icon{
        width: 5px;
        height: 5px;
        background: $color;
        border-radius: 5px;
        margin: 0 auto;
        position: relative;
    }
    .div-block-hidden{
        height: 0px;
        padding: 0px;  
        overflow: hidden;
        opacity: 0;
        margin: 0px;
    }
    i{
        color: white;
        cursor: pointer;
        display: block;
        height: 14px;
        padding-bottom: 20px;
        transition: all ease 0.4s;
        @for $i from 0 through $number
        {
            &:nth-of-type(#{$i}){
                transition: all 0.2s ease (0.12s*$i), color 0.1s ease-out; 
                // transition: all ease 0.2s (0.12s*$i) , color ease 0.1s;
            }
        }
        &:last-child{
            padding-bottom: 0px;
        }
        &:hover{
            color: $color;
        }
    }
    .no-padding{
        padding-bottom: 0px;
        z-index: 11;
    }
}
.edit-box-ed{
    background-color: black;
    padding: 9px 0px;
    width: 32px;
    opacity: 0.5;
    cursor: pointer;
    i{
        color: $color;
    }
    &:hover{
        background-color: $color;
        opacity: 1;
        i{
           color: black;
           transform: scale(1.8) rotate(45deg); 
        }
    }
}
</style>