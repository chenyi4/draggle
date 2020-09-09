<template>
    <div :class="{'cover-true':true, 'cover-true-all': isSelect}">
        <div class="chooseDom"></div>
    </div>
</template>

<script>
import eventHub from '@/event-hub/index';
import chooseDom from '@/assets/js/chooseDom.js';
export default {
  name: 'cover',
  data() {
      return {
          isSelect: false
      }
  },
  created(){
        var obj;
        const self = this;
        eventHub.$on(eventHub.editBox.CHOOSE_AREA, (value) => {
            if(typeof(value) == 'boolean'){
            self.isSelect = value;
            }
            else{
            self.isSelect = !self.isSelect;
            }
            if(self.isSelect){
                obj.start();
            }else{
                obj.close();
            }
        });
        this.$nextTick(() => {
            obj = new chooseDom();
            
        });
  },
}
</script>

<style scoped lang="scss">
  .cover-true{
    position: fixed;
    width: 0%;
    height: 0%;
    left: 0px;
    top: 0px;
    z-index: 20;
    display: block;
    cursor: crosshair;
  }

  .cover-true-all{
    width: 100%;
    height: 100%;
  }
</style>