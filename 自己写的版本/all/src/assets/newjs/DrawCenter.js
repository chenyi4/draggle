import eventHub from '@/event-hub/index';
import draw from '@/store/Modules/draw';
import Enter from './enter.js';
// import { compile } from 'vue-template-compiler';
export  class DrawCenter {
    constructor(currentDate){
        this.currentDate = currentDate;
        this.init();
    }
    
    allModules = this.getAllModules();
    
    init(){
        this.clearCenter();
        this.initOldData();
        this.drawCenterDom();
        this.hideLoading();
    }
    /**
     * 重现原始数据
     */
    initOldData(){
        draw.state.newtewtOrg = JSON.parse(JSON.stringify(this.currentDate));
    }

    clearCenter(){ 
        const Center = $('#center');
        Center.html('');
        draw.state.newtewtOrg = []; //输入值清除
    }

    upDate(upDate){
        this.clearCenter();
        this.currentDate = upDate;
        this.initOldData();
        this.drawCenterDom();
        //更新数据
        this.hideLoading();
    }

    hideLoading(){
        setTimeout(function(){
            eventHub.$emit(eventHub.center.HIDE_LOADING);
        },500);
    }

    getAllModules(){
        const modules = $('.leftMenus').find('.module');
        let modulesName = [];
        modules.each(function(i, dom){
            const className = $(dom).attr('class');
            modulesName.push({
                name: className.split(' ')[0],
                dom: $(dom).clone(),
            });
        });
        return modulesName;
    }

    drawCenterDom(){
        var initValue = this.currentDate;
        const self = this;
        if(initValue && initValue.length > 0){
            initValue.forEach(function(item){
                if(item.parentHash){
                    var hash = item.parentHash;
                    const parent = self.createChild(item, $('#'+hash));
                }else{
                    const parent = self.createChild(item, $('#center'));
                }
            });
        }
    }
    
    createChild(item, parent){
        const self = this;
        const backDom = new Enter({
            item,
            allModules: DrawCenter.prototype.getAllModules(),
            parent
        });
        return (backDom.dom);
    }
}


const DRAW = function(param){ 
    const drawback = new DrawCenter(param);
    return drawback;
}


export default DRAW;