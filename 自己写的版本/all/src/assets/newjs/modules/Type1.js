import Edits from './../edit/edit.js'
import { DrawCenter } from './../DrawCenter.js';
import type1 from '@/store/components/type1';
import eventHub from '@/event-hub/index';
import draw from '@/store/Modules/draw';
import enter from './../enter';

class Type1 extends Edits{
    constructor(dom){
        super(dom);
    }


    draw_drawInit(dom, parent){
        const self = this;
        const back = parent.append(dom);
        self.oldDateChildShow();
        return back;
    }

    /**
     * 重写 data_hashCreate
     * 因为type1的 tab 也有 hash 值，所以得重写
     */
    data_hashCreate(){
        var timestamp = this.data_baseHashCreate();
        this.param.hash = timestamp;
        this.param.children.forEach((item) => {
            var timestamp = Date.parse(new Date())+1;
            item.hash = timestamp;
        });
    }

    draw_UpDate(){ //重写overWrite
        this.titleSet();
        this.data_upDate();
    }

    oldDateChildShow(){
        const self = this;
        const tabs = this.item.children; //当前的子元素

        this.allModules; //全部所有的模块
        this.dom; //当前的元素
        if(tabs && tabs.length){
            tabs.forEach((item, i) => { // 循环显示tabs和子元素
                if(i == 0){
                    self.dom.find('.tab').eq(0).html(item.title);
                    self.dom.find('.table').eq(0).attr('id', item.hash);
                    self.clickTab();
                }
                else{
                    self.addTab(item.title, item.hash);
                }
                self.clickTabNum = i;
                self.tabNum = i + 1;
                self.oldDateAddInputAndElse(item, i);
            });
        }
        else{
            self.clickTabNum = 0;
        }
    }

    oldDateAddInputAndElse(item, i){
        const self = this;
        const childs = item.children;
        if(childs && childs.length > 0){
            childs.forEach((input) => {
                DrawCenter.prototype.createChild(input, self.dom.find('.table').eq(i));
            });
        }
    }

    setNewDom(){
        super.setNewDom();
        this.titleSet();
        this.addClick();
        this.deleteTab();
        this.setTabFirst();
    }

    setTabFirst(){
        this.dom.find('.tab').eq(0).trigger('click');
    }

    titleSet(){
        const self = this;
        var childs = this.param.children;
        let isText = false;
        childs.forEach((item, key) => {
            if(!item.title){
                isText = true;
            }
            self.dom.find('.tab').eq(key).html(item.title);
        });

        if(isText){
            this.param.noTitle = true;
            this.data_upDate();
        }else{
            this.param.noTitle = false;
            this.data_upDate();
        }
    }

    tabContentAddInputAndElse(item, num){
        let tables = this.dom.find('.table');
        if(item.childs && item.childs.length > 0){
            item.childs.forEach((each, i) => {
                const doms = (new DrawDom()).appendChild(each).dom.clone();
                $(this.dom).find('.table').eq(num).append(doms);
            });
        }
    }

    cloneDom(draggableDom){
        const self = this;
        const draggable = draggableDom.clone();
        if(draggable.data('hash')){
            return false;
        }
        if(draggable.hasClass('module1')){
            return false;
        }

        new enter(draggable[0]);
        return draggable;
    }
    
    droppableDrop(dom,draggableDom){
        const self = this;
        self.droppableDropTrue(dom,draggableDom);
    }   

    droppableDropTrue(dom,draggableDom){
        const self = this;

        var draggable = self.cloneDom(draggableDom);
        if(!draggable){
            return false;
        }
        
        if(!self.clickTabNum){
            self.clickTabNum = 0;
        };
        $(this.dom).find('.table').eq(self.clickTabNum).append(draggable);
        $(draggable).css({
            'left': 0, 
            'top': 0,
            'position': 'relative'
        });
        self.realAccet();
        self.getParentDom();
        self.data_setParentDate(draggable);
    }


    getParentDom(){
        draw.state.allObjectSave[0].isChange = false;
       
    }

    data_setParentDate(child){
        const self = this;
        var hash = this.param.children[self.clickTabNum].hash;
        var childHash = child.attr('data-hash');
        draw.state.newtewtOrg.forEach((item) => {
            if(item.hash == childHash){
                item.parentHash = hash;
            }
        });
        self.data_setTrueParentData(childHash);
    }

    addTab(title, hash){
        const self = this;
        self.tabNum = self.tabNum?self.tabNum:1;
        self.clickTabNum = 0;

        if(!title && !hash){
            self.addTab_Date();
            var child = this.param.children;
            var titleOrg = JSON.parse(JSON.stringify(child[child.length-1].title));
        }
        
        const addDom = '<div class="tab">'+(title?title:titleOrg)+'</div>';
        const table = '<div class="table" id="'+(title?hash:'')+'"></div>';

        const appendDom = self.dom.find('.tab-box').append(addDom);
        self.dom.find('.all-box').append(table);
        self.tabNum = self.tabNum + 1;
        self.clickTab();
        const tabs = $(self.dom).find('.tab-box').find('.tab');
        tabs.last().trigger('click');
        self.clickTabNum = tabs.length-1;
    }

    addTab_Date(){
        const self = this;
        var value = JSON.parse(JSON.stringify(type1.state.param.children[0]));
        value.hash = this.data_baseHashCreate();
        this.param.children.push(value);
        self.data_upDate();
        eventHub.$emit(eventHub.setright.SET_PARAM, self);
    }
    
    addClick(){
        const self = this;
        self.clickTab();
        const add = this.dom.find('.el-icon-circle-plus-outline');
        add.on('click', function(e){
            self.addTab();
            draw.state.drawIsChange = true;
            return false;
        });
    }

    deleteTab(){
        const self = this;
        const deleteButton = self.dom.find('.el-icon-remove-outline');
        deleteButton.on('click', function(){
            if(self.tabNum == 1){
                return false
            }else{
                self.deleteDateChild();
                self.deleteThing();
                //删除绑定的数据层，更新右侧的显示
            }
            draw.state.drawIsChange = true;
        });
    }

    deleteDateChild(){
        const self = this;
        this.param.children.splice(self.clickTabNum, 1);
        this.titleSet();
        this.data_upDate();
    }

    deleteThing(){
        const self = this;
        const tabBox = ($(this.dom).find('.tab-box'));
        const tableBox = $(this.dom).find('.all-box');
        tabBox.find('.tab').eq(self.clickTabNum).remove();
        tableBox.find('.table').eq(self.clickTabNum).remove();

        self.tabNum = self.tabNum - 1;
        self.clickTabNum = self.clickTabNum - 1;
        tabBox.find('.tab').eq(self.clickTabNum).trigger('click');
    }

    clickTab(){
        const self = this;
        const tableBox = $(this.dom).find('.all-box');
        const tabBox = ($(this.dom).find('.tab-box'));
        const titleDom = (tabBox.find('.tab')).last();
        titleDom.on('click', function(){
            self.clickTabNum = tabBox.find('.tab').index($(this));
            tabBox.find('.tab').removeClass('select');
            $(this).addClass('select');
            tableBox.find('.table').addClass('table-none');
            tableBox.find('.table').eq(self.clickTabNum).removeClass('table-none');
        });
    }
}


export default Type1;