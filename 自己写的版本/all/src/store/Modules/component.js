const component = {
    state: {
        componentsList: [],
        currentChooseDomObj: null
    },
    getters: {
        currentDomObj(state){
            return state.currentChooseDomObj;
        }
    },
    mutations: {

    },
    actions: {
        addComponents({state}, obj){
            console.log(state.componentsList);
            state.componentsList.push(obj);
        },
        /**
         * 删除组件,获取组件里面所有被选中的元素，然后删除它们
         */
        deleteComponents({state}){
            var components = state.componentsList;
            components.forEach((item, key) => {
                if(item.isChoose){
                    console.log(item);
                    item.clear();
                    components[key] = null;
                }
            });   
            
            var back = components.filter(item => item != null);
            state.componentsList = back;
        },
        /**
         * user editBox
         * 
         * @param {*} obj 
         */
        setCurrentChooseDom({state, dispatch}, obj){
            //设置当前选中的dom 
            state.currentChooseDomObj = obj;
            dispatch('unChooseOtherDoms');
            // console.log(obj);
        },
        /**
         * 将不选中的其余组件不被选中
         */
        unChooseOtherDoms({state}){
            state.componentsList.forEach((item) => {
                if(item == state.currentChooseDomObj){
                    // console.log("++++++++++");
                }else{
                    item.setUnChoose();
                }
            });
        },
        /**
         * 锁定选中组件
         */
        lockComponent({state}){
            state.componentsList.forEach((item) => {
                if(item.isChoose){
                    item.unUse(!item.unuse);
                }
            });
        }
    }
}

export default component;
