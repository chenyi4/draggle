import Edit from './edit.js';
import drawDom from './../drawDom'
import currentDate from '@/assets/js/setCurrentDate';
class TypeEdit extends Edit{
    constructor(dom,param,hash){ 
        super(dom,param,hash);
    }
    addInit(){
        const self = this;
        self.tabNum = self.tabNum?0:1;
        self.clickTabNum = 0;
        const add = this.dom.find('.el-icon-circle-plus-outline');
        const addDom = '<div class="tab">标题</div>';
        const table = '<div class="table" ></div>';
        TypeEdit.prototype.clickTab.call(self,self.dom.find('.tab'));

        add.on('click', function(e){
            const appendDom = self.dom.find('.tab-box').append(addDom);
            self.dom.find('.all-box').append(table);
            self.tabNum = self.tabNum + 1;
            TypeEdit.prototype.clickTab.call(self,addDom);
            const tabs = $(self.dom).find('.tab-box').find('.tab');
            tabs.last().trigger('click');
            self.clickTabNum = tabs.length;
            return false;
        });
    }

    clickTab(dom){
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

    droppable(){
        const self = this;
        const dom = this.dom;
        dom.droppable({
            drop: function( event, ui ) {
               self.permission.isPermission(ui,  drawDom.prototype.domAppend(self.dom.find('.table').eq(self.clickTabNum), ui.draggable));
            },
            out: function(event, ui){
                currentDate.removeModuleParent(ui.draggable,self.dom);
                currentDate.removeModuleParent(self.dom, ui.draggable);
                $('#center').append(ui.draggable);
            }
        });
    }

    deleteTab(){
        const self = this;
        const deleteButton = $('.el-icon-remove-outline');
        const tabBox = ($(this.dom).find('.tab-box'));
        const tableBox = $(this.dom).find('.all-box');
        deleteButton.on('click', function(){
            if(self.tabNum == 1){
                return false
            }else{
                TypeEdit.prototype.deleteThing.call(self);
            }
        });
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

    init(){
        super.init();
        TypeEdit.prototype.addInit.call(this);
        TypeEdit.prototype.droppable.call(this);
        TypeEdit.prototype.deleteTab.call(this);
    }
}

export default TypeEdit;