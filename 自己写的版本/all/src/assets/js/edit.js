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
        height: this.dom.offsetHeight
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
        self.style.left = self.dom.offsetLeft;
        self.style.top = self.dom.offsetTop;
        self.changePrint();
    }

    this.scale.stop = function(value){
        self.style.width = value.width;
        self.style.height = value.height;
        self.changePrint();
    }
}

edit.prototype.changePrint = function(){
    if(this.setPrint){
        this.setPrint(this.style);
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
    // this.dom.addEventListener('mouseup', function(){
       
    // });
}

edit.prototype.chooseSet = function(){
    const self = this;
    self.isChoose = !self.isChoose;
    if(self.isChoose){
        eventHub.$emit(eventHub.editBox.SELECT_CHOOSE_DOM, [self]);
        self.addClass();
    }else{
        self.removeClass();
    }
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
}


edit.prototype.removeClass = function(){
    const self = this;
    let className = this.dom.className;
    if(className.indexOf(self.chooseName) >= 0){
        this.dom.className = this.dom.className.replace(' '+self.chooseName, '');
    }
}

edit.prototype.change = function(param){
    this.style = param;
    this.dom.style.width = param.width + param.widthSet;
    this.dom.style.height = param.height + param.heightSet;
    this.dom.style.position = param.position;
    // console.log(param);
}


edit.prototype.clear = function(){
    // console.log("执行了删除操作");
    const self = this;
    if(self.unuse) return false;
    self.dom.remove();
    this.move = null;
    this.scale = null;
    this.dom = null;
}

edit.prototype.unUse = function(value){
    this.unuse = value;
    this.scale.unuseSet(value);
    this.move.unUseSet(value);
    // console.log(this.move);
}

export default edit;