import eventHub from '@/event-hub/index';
import component from '@/store/Modules/component.js';

var edit = function(param){
   return new edit.init(param);
}
edit.init = function(param){
    var self = this;
    this.dom = param.dom;
    this.move = param.move;
    this.scale = param.scale;
    
    this.style = {
        id: self.createHash(),
        isBomb: false,
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
        zIndex: 'auto',
        display: 'inline-block',
        justifyContent: 'initial',
        alignItems: 'stretch',
        alignSelf: 'initial',
        flexDirection: 'initial',
        flex: 'initial',
        flexWrap: 'nowrap',
        order: 0,
        flexShrink: 1,
        textAlign: 'left'
    };

    this.publish = { //需要被发布出去的参数值
        parentId: null
    }

    if(param.style){
        this.style = JSON.parse(JSON.stringify(Object.assign(this.style, param.style)));
    }
    this.unuse = false; //false 可以使用 true 不可使用
    this.init();
}

edit.init.prototype = edit.prototype;

edit.prototype.init = function(){
    this.choose();
    this.setInit();
    this.thingSet();
    this.bomb();
}

edit.prototype.createHash = function(){
    var chunk = new Date().getTime();
    var backValue = chunk + (Math.random(10))*1000;
    return Math.ceil(backValue);
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
        self.bomb();
    }
    this.scale.stop = function(value){
        self.style.trueWidth = self.style.width = value.width;
        self.style.trueHeight = self.style.height = value.height;
        self.style.isWriteValue = false;
        self.style.widthSet = 'px';
        self.changePrint('widthAndHeight');
    }
}

edit.prototype.bomb = function(){
    var self = this;
    for(var item in component.state.componentsList){
        var editDom = (component.state.componentsList[item]);
        if(editDom.dom == self.dom){
            
        }else{
            if(editDom.style.isBomb){
                var left = self.dom.offsetLeft;
                var top = self.dom.offsetTop;

                var checkLeft = editDom.dom.offsetLeft;
                var checkTop = editDom.dom.offsetTop;
                var checkRight = checkLeft +  editDom.dom.offsetWidth;
                var checkButtom = checkTop + editDom.dom.offsetHeight;
                if((left > checkLeft) && (left < checkRight)){
                    if((top > checkTop) && (checkButtom > top)){
                        /**获得到了组建 */
                        self.style.left = 0;
                        self.dom.style.left = '0px';
                        self.dom.style.top = '0px';
                        self.style.leftSet = 'px';
                        self.style.top = 0;
                        self.style.isWriteLeft = false; 
                        self.changePrint('leftAndTop');
                        editDom.dom.appendChild(self.dom);
                        self.publish.parentId = editDom.style.id;
                        /**获取到了组建 结束 */
                    }
                }
                
            }
        }
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
    this.dom.addEventListener('mousedown', function(e){
        self.chooseSet();
        e.preventDefault();
    });
}

edit.prototype.chooseSet = function(){
    const self = this;
    eventHub.$emit(eventHub.editBox.SELECT_CHOOSE_DOM, [self]);
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