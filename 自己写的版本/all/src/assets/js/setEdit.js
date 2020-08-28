import Edit from './edit/edit.js';
import TypeEdit from './edit/typeedit.js'
const edit = (function(){
    //使div获取拖拽属性，并且可以控制右侧的属性 ，编辑和div有关系
    class EditBack extends Edit {
        constructor(dom,param,hash){  
            super(dom,param,hash);
        }
        init(){
            if(this.typename == 'type1'){
                TypeEdit.prototype.init.call(this);
            }else{
                super.init();
            }
        }
    }
    return EditBack; 
})($);



export default edit;