import Edits from './../../edit/edit.js'
import eventHub from '@/event-hub/index';
import enter from './../../enter';
import draw from '@/store/Modules/draw';

class TableBottom extends Edits{
    constructor(dom){
        super(dom);
    }

    /**
     * 按钮可以被删除
     * 模块可以换位置 
     * 容器内等分，超出个数，就换行
     */

    draw_UpDate(){
        super.draw_UpDate();
        // this.draw_postion();
        // this.draw_title();
        // this.draw_setWidth();
        // this.draw_setHeight();   

    }

    //清空左侧菜单的组建
    setNewDom(){ //重写edit的初始化参数
        super.setNewDom();

        this.clear_draw();

        this.initDom();

        this.addClick();
        
        this.cutClick();

        this.topButton();
       
        this.openTable();
    }

    droppableDrop(dom, draggable){
        const self = this;
        let nextFlag = false;
        this.choose.forEach((item, key) => {
            if(item.isChoose){
                nextFlag = true;
                var dom = draggable.clone();
                var obj = new enter(dom[0]);
                obj.param.length = 3
                obj.param.title = "默认空";
                obj.changeParam(obj.param);
                self.data_setParentDate(dom, item.key);
                item.dom.find('.input-box').append(dom);
            };
        });
        if(!nextFlag){
            
        }else{
            self.realAccet();
        }
    }

    isOpenTable = false;
    openTable(){
        const self = this;
        this.dom.find('.open-line').on('click', function(){
            self.isOpenTable = !self.isOpenTable;
            self.isOpenTable?self.dom.addClass('tableBottom-css-auto'):self.dom.removeClass('tableBottom-css-auto');
            self.widthIf();
        });
    }
    
    data_setParentDate(child, key){ //设置dom的
        const self = this;
        var hash = this.param.children[key].hash;
        var childHash = child.attr('data-hash');
        draw.state.newtewtOrg.forEach((item) => {
            if(item.hash == childHash){
                item.parentHash = hash;
            }
        });
        this.data_setTrueParentData(childHash);
    }
    /**
     * @ this.oneline
     */
    clear_draw(){
        this.oneline = this.dom.find('.one-line').eq(0).clone();
        this.dom.find('.one-line').remove();
    }

    initDom(){
        this.initAppendLine();

        this.setDomTitles();

        this.widthIf();
    }

    initAppendLine(){
        const self = this;
        var childrens = this.param.children;
        this.choose = [];
        childrens.forEach(function(item, key){
            var dom = self.oneline.clone();
            var line = new OnleLine(dom);
            line.key = key;
            if(!item.hash){
                var hash = self.data_baseHashCreate() + 12243;
                dom.find('.input-box').attr('id', hash);      
                self.param.children[key].hash = hash;
            }else{
                dom.find('.input-box').attr('id', item.hash);
            }
            
           
            self.choose.push(line);
            self.dom.find('.addAll').append(dom);
        });

        self.tableDateUp();
    }
    
    draw_UpDate(){ //右侧参数值更新的时候
        const self = this;
        self.topButton();
        self.setDomTitles();
    }

    topButton(){
        const self = this;
        var arrAll = [
            {
                name: 'AddLine',
                domModule: 'add-line'
            },
            {
                name: 'CopyLine',
                domModule: 'copy-line'
            },
            {
                name: 'DeleteLine',
                domModule: 'delete-line'
            },
            {
                name: 'OpenTable',
                domModule: 'open-line'
            }
        ];

        for(var i = 0; i< arrAll.length; i++){
            var item = arrAll[i];
            var isFalse = self.param[item.name];
            if(isFalse){
                self.dom.find('.'+item.domModule).removeClass('button-hidden');
            }else{
                self.dom.find('.'+item.domModule).addClass('button-hidden');
            }
        }
    }
    
    setDomTitles(){
        const self = this;
        var childrens = this.param.children;
        var allOneLine = self.dom.find('.one-line');
        var isText = false;
        if(childrens.length == allOneLine.length){
            allOneLine.each(function(key){
                const title = childrens[key].title;
                if(!title){
                    isText = true;
                }
                $(this).find('.text').text(title).attr("title", title);
             });

            if(isText){
                this.param.noTitle = true;
                this.data_upDate();
            }else{
                this.param.noTitle = false;
                this.data_upDate();
            }
        }
    }

    addClick(){
        const self = this;
        const add = this.dom.find('.el-icon-circle-plus-outline');
        add.on('click', function(e){
            self.addOneline();
            self.widthIf();
            return false;
        });
    }


    widthIf(){
        var dom = this.dom;
        var allwidth = 0;
        var length = dom.find('.one-line').length;

        if(length){
            for(var i = 0; i< length; i++){
                allwidth = allwidth + (dom.find('.one-line').eq(i).width())
            }
        }
        var length = this.param.children.length;
        var addAll = dom.find('.addAll');

        if(addAll.width() > allwidth){
            addAll.removeClass('addAll-width');
        }
        else{
            addAll.addClass('addAll-width');
        }
    }

    // addAll-width

    cutClick(){
        const self = this;
        var deleteDom = self.dom.find('.el-icon-remove-outline');
        deleteDom.on('click', function(){
            var deletes = [];
            self.choose.forEach((item, key) => {
                if(item.isChoose){
                    var hash = self.param.children[key].hash;
                    self.deleteChild(hash);
                    
                    item.dom.remove();
                    deletes.push(item);
                }
            });
            if(deletes.length == 0){
                eventHub.$emit(eventHub.notify.MESSAGE, "请先选择需要删除的列");
            }else{
                deletes.forEach((item) => {
                    self.choose.forEach((dom, key) => {
                        if(item == dom){
                            self.param.children.splice(key, 1);
                            self.choose.splice(key, 1); 
                        }
                    });
                });
                self.widthIf();
                self.tableDateUp();
            }
        });
    }

    deleteChild(hash){
        draw.state.newtewtOrg.forEach((item, key) => {
            if(item.hash == hash){
                draw.state.newtewtOrg.splice(key, 1);
            }
        });
    }

    showDelete(){
        const dom = this.dom;
        $('.right-top').removeClass('right-top-show');
        let rightTop =  $(dom).eq(0).find('.right-top').last();
        rightTop.addClass('right-top-show');
    }

    tableDateUp(){
        const self = this;

        draw.state.drawIsChange = true;
        /**修改右侧的显示 */
        eventHub.$emit(eventHub.setright.SET_PARAM, self);

        /**修改保存的数据 */
        this.data_upDate();
    }

    addOneline(){
        const self = this;

        /** 画面新增dom */
        var dom = self.oneline.clone();
        var line = new OnleLine(dom);
        line.key = self.choose.length;

        /** 修改param */
        var hash = self.data_baseHashCreate();
        this.param.children.push(Object.assign({
            ...self.param.defaultChildren
        }, {
            hash: hash
        }));
        
        // dom
        dom.find('.input-box').attr("id", hash);
        self.choose.push(line);
        self.dom.find('.addAll').append(dom);
        self.tableDateUp();
    }
}

class OnleLine {
    constructor(dom){
        this.isChoose = false;
        this.dom = dom;
        this.oneLineClick(dom);
    }

    oneLineClick(dom){
        const self = this;
        dom.on('click', function(event){
            self.isChoose = !self.isChoose;
            if(self.isChoose){
                self.addClass();
            }
            else{
                self.removeClass();
            }
        });
    }

    addClass(){
        const self = this;
        if(self.dom.hasClass('one-line-choose')){

        }else{
            self.dom.addClass('one-line-choose');
        }
    }

    removeClass(){
        const self = this;
        if(self.dom.hasClass('one-line-choose')){
            self.dom.removeClass('one-line-choose');
        }
    }
}

export default TableBottom;


