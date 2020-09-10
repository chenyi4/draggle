
var setLocation = function(name, value){ //构造中的单体模式
    var instance = this;

    this.allcomponent = [
        { name:'bottomList', isChoose: false },
        { name: 'allcomponents', isChoose: false}
    ];
    // this.setName = function(){
    //     this.value = this.value + 1;
    //     console.log(this.value);
    // }
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
            // console.log(name);
            // console.log(window.localStorage.getItem(name));
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

setLocation.prototype.getBooleanValue = function(name){
    var backValue = JSON.parse(window.localStorage.getItem(name));
    // var backValue = window.localStorage.getItem(name);
    // console.log(Boolean(backValue));
    return backValue;
}

export default new setLocation();