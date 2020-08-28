import eventHub from '@/event-hub/index';
import drawDom from './../drawDom'
import store from '@/store/index'
import domPermission from '@/assets/js/domPermission';
import currentDate from '@/assets/js/setCurrentDate';
class Edit{
    constructor(dom,param,hash){
        const self = this;
        this.width = 0;
        this.dom = $(dom); 
        this.typename = this.getDomName();
        this.isClick = false;
        this.isAddnew = store.state.name =='store'?true:false;
        const paramDate = JSON.parse(JSON.stringify(store.state[self.typename].param));
        this.params = !param?paramDate:Object.assign(JSON.parse(JSON.stringify(store.state[self.typename].param)),param);
        this.permission = null;
        this.hash = hash?hash:null;
    }
    
    getDomName(domOrg){
        const dom = domOrg||this.dom;                                                                     
        const className = (dom.attr('class')).split(' ')[0];
        return className;
    }
    
    clickThing(){  
        const self = this;
        const dom = this.dom;
        dom.on('mousedown', function(e){
           self.isClick = true;
           drawDom.prototype.showDelete.call(self,self.dom);
           self.setRightParam(1);
             
           self.addColor();
           
           e.stopPropagation();
        });
    }
    
    addColor(){
        if(!store.state.header.isMakeup){
            return false;
        }
        const self = this;
        const dom = this.dom;
        if(dom.hasClass('choose-color')){
            dom.removeClass('choose-color')
        }
        else{
            dom.addClass('choose-color');
        }
    }

    /**设置右侧的参数值 */
    setRightParam(isNotChangeDate){
            const self = this;
            const dom = self.dom;
            const storeParam = currentDate.getModuleSaveDate(dom);
            let param = self.params;

            //把保存到全局数据里面的子元素，传递给右侧显示
            if(storeParam){
                param = Object.assign(self.params, {childName: storeParam.childName});
            }
            
            eventHub.$emit(eventHub.setright.SET_PARAM,param, dom);
            if(!isNotChangeDate){
                currentDate.updateModuleDate(dom, param);
            }
        
    }
   
    rightParamSetDomPosition(){
        if(!$.prototype.setPosition){
            $.prototype.setPosition = drawDom.prototype.setPosition;
        }
    }

    draggable(){ //move
        const self = this;
        const dom = this.dom;
        if(this.params.isDragable != false){
            dom.draggable({
                stop: function(event,ui){ //当移动dom停止以后
                    let newParam = JSON.parse(JSON.stringify(self.getNewParamfromDom(dom)));
                    self.params =  Object.assign(self.params,newParam);
                    //停止移动都会执行这个stop。不管有没有拖入物品
                    self.setRightParam();
                },
            });
        }
        //dom.resizable();
    }

    droppable(){
        const self = this;
        const dom = this.dom;
        dom.droppable({
            drop: function( event, ui ) {
               self.permission.isPermission(ui,  drawDom.prototype.domAppend(self.dom, ui.draggable));
            },
            out: function(event, ui){
                currentDate.removeModuleParent(ui.draggable,self.dom);
                currentDate.removeModuleParent(self.dom, ui.draggable);
                $('#center').append(ui.draggable);
            }
        });
    }


    getNewParamfromDom(dom){
        const left = dom.css('left').replace('px','');
        const top = dom.css('top').replace('px','');
        return {
            left:left,
            top:top
        }
    }

    setInitRight(){
        const self = this;
        const dom = self.dom;
        dom.trigger('mousedown');
        self.isClick = false;
    }
    
    setDomInitPostionToTop(){
        if(this.params.isPercent){
            return false;  
        }
        return false;
        this.isAddnew?drawDom.prototype.setPosition.call(this, this.dom, this.params):null;
    }

    initDelete(){
        const self = this;
        this.dom.find('.delete').on('click', function(){
            drawDom.prototype.deleteDom.call(self, self.dom);
        });
        //这里要去删除数据
    }

    init(){
        const self = this;

        this.rightParamSetDomPosition();

        this.clickThing();

        //刚注册的时候，就触发清除，清除以后移动了，触发了修改右侧的数据。然后马上把新的数据去更新了当前数据
        
        this.draggable();

        this.droppable();

        this.setInitRight();

        this.setDomInitPostionToTop();

        this.initDelete();

        currentDate.addModule(this);

        this.permission = new domPermission(this.dom);
    }
}

export default Edit;