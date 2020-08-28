
import DrawBase from './../draw/drawbase';
import draw from '@/store/Modules/draw';
import eventHub from '@/event-hub/index';
draw.data_count = null;
class DateBase extends DrawBase{
    constructor(dom){
        super(dom);
    }
    //names = 'aksjdksj';
    data_init(){
        this.data_hashCreate();
        this.data_treeListAddModule();
    }

    data_baseHashCreate(){
        return Math.ceil(Date.parse(new Date()) + Math.random()*19);
    }

    data_hashCreate(){
        var timestamp = this.data_baseHashCreate();
        this.param.hash = timestamp;
    }

    data_treeListAddModule(){
        eventHub.$emit(eventHub.drawing.CHANGE_DRAW_DATA, {
            type: 'add',
            value: JSON.parse(JSON.stringify(this.param))
        });
        this.data_changeOut("新增");
    }
    /**
     * 设置原始数据orginDate 树形数据的元素父子关系
     * draw.state.orginDate
     * @param {*} child //子元素的dom
     * 
     */
    data_setParentDate(child){
        const self = this;
        var childHash = child.attr('data-hash');
        draw.state.newtewtOrg.forEach((item) => {
            if(item.hash == childHash){
                item.parentHash = this.param.hash;
            }
        });
        
        draw.state.allObjectSave.forEach((item) => {
            if(item.param.hash ==  childHash){
                item.param.parentHash = self.param.hash;
            }
        });
        this.data_setTrueParentData(childHash);
    }

    /** 
     * @子元素 childHash 
     * */
    data_setTrueParentData(childHash){
        const self = this;
        //如果接收到的子元素的id 值 等于 组件库里面某个原始值，就将原始值的父元素的真实parentHash 保存 起来
        draw.state.allObjectSave.forEach((item) => {
            if(item.param.hash ==  childHash){
                item.param.trueParentHash = self.param.hash;
            }
        });
        draw.state.newtewtOrg.forEach((item) => {
            if(item.hash == childHash){
                item.trueParentHash = this.param.hash;
            }
        });
    }

    data_upDate(){
        const data = this.param;
        eventHub.$emit(eventHub.drawing.CHANGE_DRAW_DATA,{ 
            type: 'updata',
            value: data 
        });
        this.data_changeOut("修改");
    }

    /**
     * param 值被更改了以后
     * 去更新draw.state.orginDate的值
     */

    data_paramChangeOrginDate(){
        return false;
        var self = this;
        draw.state.orginDate.forEach((item,key) => {
            if(item.Hash == self.param.Hash){
                self.param.parentHash = item.parentHash;
                draw.state.orginDate[key] = self.param;
            }
        });
        
    }

    /**
     * 输出更新输出出口
     * 
     */
   
    data_changeOut(val){
        const self = this;
        if(draw.data_count){
            clearTimeout(draw.data_count); 
        }
        draw.data_count = setTimeout(function(){
            eventHub.$emit(eventHub.datestore.SET_HISTORY, {
                param: self.param,
                name: val
            });
            clearTimeout(draw.data_count); 
        }, 100);
    }

    data_orgDataDelete(){
        const self = this;
        draw.state.drawIsChange = true;
        let parentHash = "";
        draw.state.allObjectSave.forEach((item, key) => {
            if(item == self){
                parentHash = item.param.hash;
                draw.state.allObjectSave.splice(key, 1);
                // draw.state.allObjectSave.splice(draw.state.allObjectSave.find((dom) => {
                //     return dom.param.trueParentHash == parentHash;
                // }));  
                //把包含在其中的元素也删除
            }
        });
        draw.state.allObjectSave = draw.state.allObjectSave.filter((item) => {
            return item.param.trueParentHash != parentHash;
        });
        //把原始数据删除
    }

    /**
     * 对数据的删除操作
     */
    data_delete(){
        const self = this;
        const data = this.param;
        self.data_orgDataDelete();
        eventHub.$emit(eventHub.drawing.CHANGE_DRAW_DATA,{ 
            type: 'delete',
            value: data 
        });
        this.data_changeOut("删除");
        return false;
    }

    data_store_set(ComponentList){
        return false;
        console.log("执行了");
        var value = JSON.parse(JSON.stringify(ComponentList));
        var list = JSON.parse(window.localStorage.getItem("data"))||[];
        if(list.length){
            if(value == list[list.length-1]) return false;
        }
        list.push(value);
        window.localStorage.setItem("data",JSON.stringify(list));
        return false;    
    }

    setDate(){
        console.log('这是基础数据处理');
    }
}

export default DateBase;