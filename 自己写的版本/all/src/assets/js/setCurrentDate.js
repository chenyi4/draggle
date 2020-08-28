import store from '@/store/index';
import utils from '@/assets/js/utils';
import localStorage from '@/assets/js/localStorage'
const currentDate = (function(){ // self location date 当前本地数据
    class currentDate{
         //如果原来有数据，就初始化constructor;
        constructor(store){
            this.date = [
                
            ]; 
            //初始化的数据
            // this.store = store;
        }   
        
        updateStore(){
            //localStorage.saveDate(this.date);
            //更新传出的数据，历史记录
            //this.date 放进 store里面
            
            // console.log("======历史=====start");
            // console.log(this.date);
            // console.log("======历史=====end");
        }

        clearAllDate(){
            this.date = [
                
            ];
            this.updateStore();
        }

        addModule(moduleOrgDate){
            const ModuleDate = {
                module: moduleOrgDate.typename,
                param: JSON.parse(JSON.stringify(moduleOrgDate.params)), 
                dom: moduleOrgDate.dom[0],
                hash: moduleOrgDate.hash||Date.parse(new Date())
            }
            this.date.push(ModuleDate);
            this.updateStore();
        }

        //模块里面的参数更新的时候，去更新参数
        updateModuleDate(dom, currentParam){
            const self = this;
            const date = this.date;
            date.forEach(function(item, i){
                if(item.dom == dom[0]){
                    const orgParam = utils.deepCopy(date[i].param);
                    self.date[i].param = Object.assign(orgParam, currentParam);
                };
            });
            this.updateStore();
        }

        getModuleSaveDate(dom){
            let domParam = null;
            const date = this.date;
            date.forEach(function(item, i){
                if(item.dom == dom[0]){
                    domParam =  item.param;
                };
            });
            return utils.deepCopy(domParam);
        }

        getModuleHash(dom){
            let hash = null;
            const date = this.date;
            date.forEach(function(item, i){
                if(item.dom == dom[0]){
                    hash =  item.hash;
                };
            });
            return utils.deepCopy(hash);
        }

        addModuleParent(parentDom, domName, dom, hash){
            let domParam = null;
            const date = this.date;
            let param = null;
            let isExist = true;
            date.forEach(function(item, i){
                if(item.dom == parentDom[0]){
                    if(date[i].param.childName == '无'){
                        date[i].param.childName = [{
                            modeulename: domName,
                            hash: hash
                        }];
                    }else{
                        if(date[i].param.childName){
                            date[i].param.childName.forEach(function(item){
                                if(item.hash == hash){
                                    isExist = false;
                                }
                            });
                            if(isExist){
                                date[i].param.childName.push({
                                    modeulename: domName,
                                    hash: hash
                                });
                            }
                        }
                    }
                    param = date[i].param;
                }
                //因为Edit里面的draggable => stop 里面已经有更新数据了，所以这里不再更新数据
            });
            return param;
        }

        removeModuleParent(dom, parentDom){
            const domHash = this.getModuleHash(dom);
            const parentHash = this.getModuleHash(parentDom);
            const date = this.date;
            date.forEach(function(item, i){
                if(item.hash == parentHash){
                    const child = item.param.childName;
                    if(typeof(child) != 'string' && child.length > 0){
                        child.forEach(function(childItem, i){
                            if(childItem.hash == domHash){
                                child.splice(i, 1);
                            }
                        });
                    }
                }
            });
        }
    }

    return function(){
        const date = store.state.date;
        if(date.isInit == false){
            const currentData = new currentDate();
            store.commit('setisInit',currentData);
            return currentData;
        }
        else{
            return date.dataObject;
        }        
    }();
})();

export default currentDate;