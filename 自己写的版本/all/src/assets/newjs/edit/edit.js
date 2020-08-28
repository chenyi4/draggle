import DateBase from '../data/database';
import store from '@/store/index'
import eventHub from '@/event-hub/index';
import Base from '../edit/base';
import enter from './../enter';
import draw from '@/store/Modules/draw';

class Edits extends DateBase{
    constructor(dom){
        //复现数据
        super(dom);
        this.init(dom);
    }
        
    init(dom){
        this.oldparam = dom.item;
        if(dom instanceof HTMLElement){ //如果是新的组件模块
            this.edit_setParam();
            this.draw_UpDate();
            this.setNewDom();
            this.data_init();
            this.draw_domHash(dom);
            draw.state.drawIsChange = true;
        }
        else{ //如果是渲染以前的模块组件
            const item  = this.item = dom.item; // 原始数据
            this.param = item.param = JSON.parse(JSON.stringify(dom.item));
            /**
             * @item
             * {
             *  ComponentId: 1
                ComponentType: 1
                Height: ""
                Name: ""
                Title: ""
                Width: ""
                X: ""
                Y: ""
             * }
             */
             //item.param 王兴的数据结构里面没有param 下面的值 => item.param => item;
            const allModules = this.allModules = dom.allModules; //获取所有存在的dom
            const parent = dom.parent;
            let Dom = Base.prototype.getDom.call(null,item,allModules);
            this.dom = Dom;
            this.getName();
            // this.edit_setParam();
            // this.param = Object.assign(JSON.parse(JSON.stringify(store.state[this.className].param)),this.oldparam);
            this.draw_drawInit(Dom, parent);
            this.setNewDom();
            // this.data_init();
            //对老数据的处理，还没写，很麻烦    
            this.draw_domHash(this.dom);
        }        
    }

    setNewDom(){
        // this.appendCenter();

        this.draggable();

        this.droppable();

        this.clickThing();

        this.deleteClick();
    }

    edit_setParam(){ //设置初始化param
        var param = JSON.parse(JSON.stringify(store.state[this.className].param));
        //不需要合并原来的参数值
        this.param = Object.assign(param,this.oldparam);
    }

    appendCenter(){
        const self = this;
        // $('#center').droppable({
        //     //http://api.jqueryui.com/draggable/
        //     drop: function( event, ui ) {
        //             const dom = $(ui.helper[0]);
        //             if($(ui.helper[0]).parent().hasClass('center')){
                       
        //             }else{
        //                 $(ui.helper[0]).attr('style','');
        //                 dom.attr('style','');
        //                 $(event.target).append(dom);
                        
        //                 //把原来的组件放回去
        //                 // var className = dom.attr('class').split(' ')[0];
        //                 // var clone = dom.clone();
        //                 // $('.'+className+'-box').append(clone);
        //                 // new enter(clone[0]);
        //             }
        //     }
        // });
    }
   
    draggable(){
        const self = this;
        const dom = this.dom;
        dom.addClass('fixed')
        if(this.param.isDragable != false){
        dom.draggable({
                stop: function(event,ui){ //当移动dom停止以后
                    var style = self.dom.attr("style", "left: 0px;");
                    //更新数据 把当前画面数据传给数据层
                },
                start: function(event, ui){
                }
            });
        }else{
            //更新数据 把当前画面数据传给数据层
        }
    }
    
    changeParam(param){
        // this.param.typename = value;
        this.param = param; //更新数据
        this.data_upDate();
        this.draw_UpDate();
    }

    droppable(){
        const self = this;
        const dom = this.dom;

        if(self.oldparam){
            self.droppableDropPre();
        }
        dom.droppable({
            drop: function( event, ui ) {
                console.log(ui.draggable);
                console.log(self.dom);
                self.droppableDropPre(self.dom, ui.draggable);
            },
            out: function(event, ui){
               // console.log('ssssssss');
                self.droppableOut(ui.draggable);
            }
        });
    }

    droppableDropPre(dom, draggable){
        const self = this;
        var isAccept = true;
        setTimeout(function () {
            if(!dom){ return false; }
            draw.state.allObjectSave.forEach((item, key) => {
                if(item.param.trueParentHash == self.param.hash){
                    if(item.isAccept){
                        isAccept = false;
                        draw.state.allObjectSave[key].isAccept = false;
                        if(self.param.parentHash){
                            self.isAccept = true;
                        }
                    }
                }
            });     
            if(isAccept){
                self.droppableDrop(dom, draggable);
            }
        }, (self.param.permissionNum-98)*5);
    }

    realAccet(){
        const self = this;
        self.isAccept = true;
    }

    cloneDom(draggable){
        const self = this;
        const trueDom = draggable.clone();
        if(trueDom.data('hash') ){
            return false;
        }
        new enter(trueDom[0]);
        return trueDom;
    }

    droppableDrop(event,draggable){
        const self = this;
        const trueDom = self.cloneDom(draggable);
        if(!trueDom){
            return false;
        }

        self.Draw.append(event, trueDom);
        $(trueDom).css({
            'left': 0,
            'top': 0,
            'position': 'relative'
        });
        self.data_setParentDate(trueDom);
        return false;
        
       /* console.log('拖入模块');*/
    }

    droppableOut(dom){
        const self = this;
        let left,top;
        left = $(dom).position().left;
        top = $(dom).position().top;
    }

    clickThing(){
        const self = this;
        const dom = this.dom;
        dom[0].addEventListener('click', function(e){
            self.setRightParam();
            self.showDelete();
            e.stopPropagation();
            return false;
        }, false);
        // dom.on('mousedown', function(e){
           
        // });
    }

    setRightParam(){
        const self = this;
        eventHub.$emit(eventHub.setright.SET_PARAM,self);
    }
}

export default Edits;