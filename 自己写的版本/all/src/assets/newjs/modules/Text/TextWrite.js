import Edits from './../../edit/edit.js'

class TextWrite extends Edits {
    constructor(dom){
        super(dom);
    }

    draw_UpDate(){
        super.draw_UpDate();
        this.rewrite();
        this.draw_pxSetWidth();
    }

    setNewDom(){
        super.setNewDom();
        this.rewrite();
        this.draw_pxSetWidth();
    }

    draw_setWidth(){
        var width = this.param.width;
        var height = this.param.height;
        if(width){
            this.dom.css({
                'width': width +'%',
            });
        }
        if(height){
            this.dom.css({
                'height': height +'%',
            });
        }
    }

    rewrite(){
        var content = this.param.context;
        console.log(content);
        this.dom.find('.text').html(content);
    }

    draw_pxSetWidth(){
        var width = this.param.setWidth;
        var height = this.param.setHeight;
        if(width){
            this.dom.css({
                'width': width +'px'
            });
        }   
        if(height){
            this.dom.css({
                'height': height +'px'
            });
        }
    }

}

export default TextWrite;