import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import './assets/css/index.scss';
import eventHub from './event-hub/index';
import VueDragula from 'vue-dragula';
import currentDate from '@/assets/js/setCurrentDate';
require('webpack-jquery-ui');

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueDragula);
new Vue({
  router,
  store,
  data: {
      
  },
  mounted(){
    const self = this;
    eventHub.$on(eventHub.api.NOT_LOGGED_IN, (yourData)=>{
        // alert('sss'); //处理事件
    });
  },
  created(){
    // Vue.vueDragula.options('grey-bag', {
    //   copy: true
    // });
    // var serve = Vue.vueDragula;
    // serve.eventBus.$on('drop', (args) => {
    //   if(args[0] == "grey-bag" && args[2]){
    //     eventHub.$emit(eventHub.drawing.SET,args[1]);
    //   }
    // });
  },
  beforeDestroy(){ // 在实例销毁之前，移除监听器ss
     eventHub.$off(eventHub.api.NOT_LOGGED_IN);
    
  },
  render: h => h(App)
}).$mount('#app')
