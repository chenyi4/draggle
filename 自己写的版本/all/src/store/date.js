const date = {
    state: {
        isInit: false,
        dataObject: null,
        localStoreNum: 0,
        localDate: null
    },
    mutations: {
       setisInit (state,object) {
         state.isInit = true;
         state.dataObject = object;
      },
      setLocalStoreNum(state, num){
        state.localStoreNum = num;
      }
    },
  }

  export default date;