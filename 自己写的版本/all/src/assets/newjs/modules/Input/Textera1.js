import InputBase from './InputBase.js'
class Textera1 extends InputBase {
    constructor(dom){
        super(dom);
    }

    draw_UpDate(){
        super.draw_UpDate();
        this.heightlength();
    }

    heightlength(){
        var height = 50;
        const heightlength  = this.param.heightlength;
        if(heightlength){
            this.dom.css({
                height: heightlength*height+'px'
            }).find('textarea').css({
                height: heightlength*height-10+'px'
            });
        }
    }

    initDom(){
        console.log("initDom");
    }


}
export default Textera1;
