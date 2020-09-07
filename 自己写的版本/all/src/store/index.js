import Vue from 'vue'
import Vuex from 'vuex'
import header from './Modules/header';

// ======================================
import { isTest } from './defaultDate';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
      name: 'store',
      currentDraw: [ 
          
      ],  
      currentChoose: [],
      bodySet: {
        bodySet: {}, //对body的设置
      }
  },
  mutations: {
     setCunnentDom(state){
       state.set = 2090;
     }
  },
  actions: {

  },
  getters: {
    
  },
  modules: {
    header
  }
})
