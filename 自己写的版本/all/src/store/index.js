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

import header from './header'
import date from './date'
import table from './Modules/table'
import leftTree from './Modules/leftTree'
import draw from './Modules/draw'
import button from './Modules/button'
import backSet from './Modules/backSet'
import keyword from './Modules/keyword';
import allThing from './Modules/allThing';
import dataDictionarie from './Modules/dataDictionarie';
import publish from './Modules/publish';
import page from './Modules/page';
import thingFlow from './Modules/thingFlow';
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
    date,
    header,
    table,
    leftTree,
    draw,
    button,
    backSet,
    keyword,
    dataDictionarie,
    publish,
    page,
    allThing,
    thingFlow
  }
})
