import Vue from 'vue'
import Vuex from 'vuex'
import inputtext1 from './components/inputtext1'
import type1 from './components/type1'
import module1 from './components/module1'
import tableBottom from './components/tableBottom';
import textera1 from './components/textera1';
import select from './components/select';
import check from './components/check';
import radio from './components/radio';
import dateinput from './components/dateinput'
import timeinput from './components/timeinput'
import datetimeinput from './components/datetimeinput'
import cusbutton from './components/cusbutton'
import passwordinput from './components/passwordinput'
import numberinput from './components/numberinput'
import textwrite from './components/textwrite'

// ======================================
import { isTest } from './defaultDate';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
      name: 'store',
      currentDraw: [ 
        
      ],  
      isTest: isTest,
      currentDom: null,
      bodySet: {}
  },
  mutations: {
     setCunnentDom(state){
       state.set = 2090;
     }
  },
  actions: {

  },
  modules: {
    type1,
    inputtext1,
    tableBottom,
    textera1,
    select,
    check,
    radio,
    dateinput,
    timeinput,
    datetimeinput,
    cusbutton,
    module1,
    passwordinput,
    numberinput,
    textwrite,
  }
})
