import eventHub from '@/event-hub/index';
const component = {
    state: {
        componentsList: [],
        currentChooseDomObj: [], //当前选中的dom
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
            state.componentsList.push(obj);
        },
        /**
         * 删除组件,获取组件里面所有被选中的元素，然后删除它们
         */
        deleteComponents({state}){
            var components = state.componentsList;
            components.forEach((item, key) => {
                if(item.isChoose){
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
            if(obj.length == 1 && state.currentChooseDomObj.length == 1 && (state.currentChooseDomObj[0].dom == obj[0].dom)){
                state.currentChooseDomObj = [];
            }else{
                state.currentChooseDomObj = obj;
            }
            dispatch('unChooseOtherDoms');
        },
        /**
         * 将不选中的其余组件不被选中
         */
        unChooseOtherDoms({state}){
            state.componentsList.forEach((item) => {
                var chooseDom = null;
                state.currentChooseDomObj.forEach((chooseItem) => {
                    if(item == chooseItem){
                        chooseDom = item;
                    }
                });

                if(chooseDom){ 
                    item.setDomChoose();
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
        },
        computeChooseComponent({state}, value){
            var publishArray = [];
            if(value.endLeft == 0) return false;
            state.componentsList.forEach((item) => {
                item.setUnChoose();
            });

            state.componentsList.forEach((item) => {
                if((value.left - (item.style.width/2)) < item.style.offsetLeft){
                    if(value.endLeft > (item.style.offsetLeft + (item.style.width/2))){
                        if(value.top < (item.style.offsetTop + (item.style.height/2))){
                            if(value.endTop > (item.style.offsetTop + item.style.height/2)){
                                publishArray.push(item);
                                item.setDomChoose();
                            }
                        }
                    }
                }
            });

            eventHub.$emit(eventHub.editBox.SELECT_CHOOSE_DOM, publishArray);
        },
        publishAllComponents({state}){
            var components = [];
            state.componentsList.forEach((item) => {
                components.push(Object.assign(item.style, item.publish));
            });
            return components;
        }
    }
}

export default component;
