import eventHub from '@/event-hub/index';

var edit = function(param){
   return new edit.init(param);
}
edit.init = function(param){
    var self = this;
    this.dom = param.dom;
    this.move = param.move;
    this.scale = param.scale;
    
    this.style = {
        left: this.dom.offsetLeft,
        top: this.dom.offsetTop,
        width: this.dom.offsetWidth,
        height: this.dom.offsetHeight,
        trueWidth: this.dom.offsetWidth,
        trueHeight: this.dom.offsetHeight,
        position: "absolute",
        widthSet: 'px',
        leftSet: 'px',
        isWrap: true,
        color: 'black',
        fontSize: 'medium',
        borderRadius: '0px',
        border: '1px dashed grey',
        borderColor: 'none',
        borderStyle: 'dotted',
        borderWidth: '1',
        zIndex: 'auto'
    };
    this.unuse = false; //false 可以使用 true 不可使用
    this.init();
}

edit.init.prototype = edit.prototype;

edit.prototype.init = function(){
    this.choose();
    this.setInit();
    this.thingSet();
}

edit.prototype.thingSet = function(){
    var self = this;
    this.move.stop = function(value, obj){
        self.style.left = Number((self.dom.style.left).replace('px', ''));
        self.style.top = Number((self.dom.style.top).replace('px', ''));
        self.style.offsetLeft = self.dom.offsetLeft;
        self.style.offsetTop = self.dom.offsetTop;
        self.style.leftSet = 'px';
        self.style.inputLeft = self.style.left;
        self.style.isWriteLeft = false; 
        self.changePrint('leftAndTop');
    }

    this.scale.stop = function(value){
        self.style.trueWidth = self.style.width = value.width;
        self.style.trueHeight = self.style.height = value.height;
        self.style.isWriteValue = false;
        self.style.widthSet = 'px';
        self.changePrint('widthAndHeight');
    }
}

edit.prototype.changePrint = function(value){
    if(this.setPrint){
        this.setPrint(this.style, value);
    }
}

edit.prototype.setInit = function(){
    this.isChoose = false;
    this.chooseName = "choose";
}

edit.prototype.choose = function(){
    const self = this;
    this.dom.addEventListener('mousedown', function(){
        self.chooseSet();
    });
}

edit.prototype.chooseSet = function(){
    const self = this;
    // self.isChoose = !self.isChoose;
    // if(self.isChoose){
    eventHub.$emit(eventHub.editBox.SELECT_CHOOSE_DOM, [self]);
    //     self.addClass();
    // }else{
    //     self.removeClass();
    // }
}

edit.prototype.setUnChoose = function(){
    const self = this;
    self.isChoose = false;
    self.removeClass();
}


edit.prototype.setDomChoose = function(){
    const self = this;
    self.isChoose = true;
    self.addClass();
}

edit.prototype.addClass = function(){
    const self = this;
    let className = this.dom.className;

    if(className.indexOf(self.chooseName) >= 0){

    }else{
        this.dom.className = className + ' '+this.chooseName;
    }
    this.isChoose = true;
}

edit.prototype.removeClass = function(){
    const self = this;
    let className = this.dom.className;
    if(className.indexOf(self.chooseName) >= 0){
        this.dom.className = this.dom.className.replace(' '+self.chooseName, '');
    }
    this.isChoose = false;
}

edit.prototype.change = function(param, type){
    if(!type){
        for(var item in param){
            this.style[item] = param[item];
            this.dom.style[item] = param[item];
        }
    }
    else if(type == 'content'){
       this.style[type] = param[type];
       this.dom.getElementsByClassName('content')[0].innerHTML = this.style.content;  
    }else if( type == 'backgroundColor'){
        this.style[type] = param[type];
        this.dom.style['background-color'] = param[type];
    }else{
        this.style[type] = param[type];
        this.dom.style[type] = param[type];
    }
}

/**
 * 删除该组件 ,清除此组件的各项属性
 */
edit.prototype.clear = function(){
    const self = this;
    if(self.unuse) return false;
    self.dom.remove();
    this.move = null;
    this.scale = null;
    this.dom = null;
}

/**
 * 禁止使用
 * @param {*} value 
 * value 是否禁止使用 
 * true 禁止操作修改该组件
 * false 允许操作修改该组件
 */

edit.prototype.unUse = function(value){ 
    this.unuse = value;
    this.scale.unuseSet(value);
    this.move.unUseSet(value);
}

export default edit;