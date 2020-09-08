<template>
    <div :class="{'cover-true':true, 'cover-true-all': isSelect}"></div>
</template>

<script>
import eventHub from '@/event-hub/index';
export default {
  name: 'cover',
  data() {
      return {
          isSelect: false
      }
  },
  created(){
        const self = this;
        eventHub.$on(eventHub.editBox.CHOOSE_AREA, (value) => {
            console.log("执行了具体内容");
            if(typeof(value) == 'boolean'){
            self.isSelect = value;
            }
            else{
            self.isSelect = !self.isSelect;
            }
        });
  },
}
</script>

<style scoped lang="scss">
  .cover-true{
    position: absolute;
    width: 0%;
    height: 0%;
    left: 0px;
    top: 0px;
    display: block;
    cursor: crosshair;
  }

  .cover-true-all{
    width: 100%;
    height: 100%;
  }
</style>