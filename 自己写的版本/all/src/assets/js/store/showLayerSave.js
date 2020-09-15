import eventHub from '@/event-hub/index';
var setLocation = function(name, value){ //构造中的单体模式
    var instance = this;

    this.allcomponent = [
        { name:'bottomList', isChoose: false , thing: null, type:'底部菜单' },
        { name: 'allcomponents', isChoose: false, thing: 'SHOW_componentBox', type: '所有控件显示' },
        { name: 'editLayer', isChoose: false , thing: 'SHOW_editShow' ,type: '组件编辑'}
    ];
  
    this.isChooseHidden = [];
    setLocation = function(){
        return instance;
    }
}

setLocation.prototype.setChoose = function(name, isChoose){
    try{
        var isExist = false;
        var chooseItem;
        
        this.allcomponent.forEach((item) => {
            if(item.name == name){
                isExist = true;
                item.isChoose = isChoose;
                chooseItem = item;
            }
        });
        if(isExist){
            window.localStorage.setItem(chooseItem.name, chooseItem.isChoose);
        }
        if(!isExist){
            throw {
                name: "Error",
                message: "该组件没有被注册",
                path: 'showLayerSave.js'
            }
        }
    }catch(e){
        console.log('%c'+JSON.stringify(e),'color:red');
    }
}

setLocation.prototype.hiddenAndShowAll = function(value){
    if(value){
        this.isChooseHidden = [];
        this.allcomponent.forEach(item => {
            if(item.isChoose){
                if(item.thing){
                    this.isChooseHidden.push(item);
                    eventHub.$emit(eventHub.header[item.thing], false)
                }
            }
        });
    }else{
        this.allcomponent.forEach(item => {
            this.isChooseHidden.forEach((choose) => {
                if(item.name == choose.name){
                    if(!choose.isChoose){
                        item.isChoose = true;
                        eventHub.$emit(eventHub.header[item.thing], true)
                    }
                }
            });
        });
        this.isChooseHidden = [];
    }
}

setLocation.prototype.getBooleanValue = function(name){
    try{
        var backValue = JSON.parse(window.localStorage.getItem(name));
        
        for(var i in this.allcomponent){
            var item = this.allcomponent[i];
            if(item.name == name){
                item.isChoose = backValue;
            }
        }
        // var backValue = window.localStorage.getItem(name);
        return backValue;
    }catch(e){
        console.log('%c'+"组件"+name+"获取显示初始变量有问题", 'color:red');
    }
}

export default new setLocation();