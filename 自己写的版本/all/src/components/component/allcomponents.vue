<template>
    <div :class="{'allcomponent':true, 'allcomponent-hidden': !iscomponentBox}">
        <div class="content">
            <div :class="{'draw':true, 'draw-choose': isChoose}">
                <div class="content"></div>
                <div class="before"></div>
            </div>
            <div class="close">
                <div class="close-box">
                    <i class="el-icon-close" @click.stop="closeAll"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import showLayerSave from '@/assets/js/store/showLayerSave';
import drag from '@/assets/js/drag3.js'
import utils from '@/assets/js/utils.js';
import scaleCY from '@/assets/js/scale.js';
import edit from '@/assets/js/edit.js';

import eventHub from '@/event-hub/index';
export default {
  name: 'allComponents',
  components: {
      
  },
  data() {
      return {
          isChoose: false,
          iscomponentBox: false,
      }
  },
  methods: {
      choose(){
          this.isChoose = !this.isChoose;
      },
      closeAll(){
        //更新store里面的值
        this.$store.commit('setButtomFalse', 'componentBox');
        //   eventHub.$emit(eventHub.header.SHOW_componentBox);
      },
      addComponent(obj){
          this.$store.dispatch('addComponents', obj);
      }
  },
  watch: {
      iscomponentBox(value){
         showLayerSave.setChoose('allcomponents', value);
      }
  },
  created(){
      const self = this;
      this.$nextTick(() => {
        //   drag({
        //         select: 'draw-head',
        //         moveSelect: 'allcomponent',
        //   });
          const drawHome = document.getElementsByClassName('trueBody')[0];
          drag({ //碰撞检测
                select: 'draw',
                // isCopy: true, //是否使用拷贝的组件
                helper: function(dom){
                    var cloneDom = dom.cloneNode(true);
                    cloneDom.style.position = "fixed";
                    return cloneDom;
                },
                stop: function(dom, ui){
                    var back = utils.getPosition(drawHome);
                    var isTrue = false;
                    if(ui.position.offsetLeft > back.left){
                        if(ui.position.offsetRight < (back.left + back.width)){
                            if(ui.position.offsetTop > back.top){
                                if(ui.position.offsetBottom < (back.top + back.height)){
                                    isTrue = true;
                                }
                            }
                        }
                    }
                    if(isTrue){
                        dom.style.left = Number(dom.style.left.replace('px', '')) -  back.left +'px';
                        dom.style.top = Number(dom.style.top.replace('px', '')) - back.top + dom.offsetHeight +'px';
                        dom.style.position = "absolute";
                        drawHome.appendChild(dom);
                        
                        
                    }
                    else{
                        dom.remove();
                    }
                },
                out(dom, ui){
                    var obj = edit({dom:dom, move: ui, scale: scaleCY(dom)});
                    self.addComponent(obj);
                }
            });

      });
      self.iscomponentBox = showLayerSave.getBooleanValue('allcomponents');  


      eventHub.$on(eventHub.header.SHOW_componentBox, (value) => {
            console.log(typeof(value));
            if(typeof(value) == 'boolean'){
                self.iscomponentBox = value;
            }else{
                self.iscomponentBox = !self.iscomponentBox;
            }
       });
  }
}
</script>

<style scoped lang="scss">
    .allcomponent{
        width: 100%;
        height: 60px;
        position: fixed;
        left: 0;
        top: 0;
        background: #eeeeee;
        text-align: left;
        opacity: 0.6;
        transition: all ease 0.2s;
        cursor: pointer;
        .content{
            transition: all ease 0.2s 0.2s;
            opacity: 1;
        }
        .draw-choose{
           background: blue; 
        }
        &:hover{
            opacity: 1;
        }
        // .draw-head{
        //     width: 100%;
        //     height: 30px;
        //     background: black;
        //     cursor: pointer;
        // }
        .close{
            width: 40px;
            height: 100%;
            background: none;
            position: absolute;
            right: 0px;
            top: 0px;
            opacity: 0;
            transition: all ease 0.4s;
            &:hover{
                height: calc(100% + 30px);
                opacity: 1;
                .close-box{
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: black;
                    bottom: 0px;
                    right: 0px;
                    font-size: 20px;
                    color: white;
                    text-align: center;
                    i{
                        line-height: 30px;
                    }
                }
            }
            .close-box{
                font-size: 0px;
            }
        }
    }
    .allcomponent-hidden{
        width: 0px;
        height: 0px;
        overflow: hidden;
        transition: all ease 0.2s 0.3s;
        .content{
            opacity: 0;
            transition: all ease 0s;
        }
    }        
</style>