import Edits from './../../edit/edit.js'
class InputBase extends Edits {
    constructor(dom){
        super(dom);
    }

    draw_UpDate(){
        super.draw_UpDate();
        this.update_Length();
    }

    update_Length(){
        var length = this.param.length;
        var dom = this.dom;
        // length = length?length:1;
        if(length == null) {
            // this.param.length = 1;
            dom.attr("style", "");
            return false;
        }
      
        //这一段得删掉，为了让老数据能不错才写进去的
        if(length == 0){
            this.param.length = 1;
            this.data_upDate();
            length = 1;
        }

        const width = 30.8;
        dom.css({ 
            'width': (width*length -2.5)+'%'
        });
    }

    droppableDrop(dom, draggable){
        this.isAccept = true;
        return false;
    }

    setNewDom(){
        super.setNewDom();
        this.update_Length();
    }
}
export default InputBase;
