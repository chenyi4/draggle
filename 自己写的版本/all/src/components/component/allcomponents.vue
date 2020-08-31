<template>
    <div class="allcomponent">
        <div class="draw-head"></div>
        <div :class="{'draw':true, 'draw-choose': isChoose}">
            <div class="before"></div>
        </div>
    </div>
</template>

<script>
import drag from '@/assets/js/drag3.js'
import utils from '@/assets/js/utils.js';
import scaleCY from '@/assets/js/scale.js';
export default {
  name: 'allComponents',
  components: {

  },
  data() {
      return {
          isChoose: false
      }
  },
  methods: {
      choose(){
          this.isChoose = !this.isChoose;
      }
  },
  created(){
      this.$nextTick(() => {
          drag({
                select: 'draw-head',
                moveSelect: 'allcomponent',
          });

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
                        scaleCY(dom);
                    }
                    else{
                        dom.remove();
                    }
                },
            });
      });
  }
}
</script>

<style scoped lang="scss">
    .allcomponent{
        width: 200px;
        height: 400px;
        position: fixed;
        left: 14px;
        top: 100px;
        background: #eeeeee;
       
        .draw-choose{
           background: blue; 
        }
        .draw-head{
            width: 100%;
            height: 30px;
            background: black;
        }
    }
     
</style>