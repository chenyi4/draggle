
import Base from './../edit/base';
import { storeDefault } from '@/store/defaultDate'
class DrawBase extends Base{
    constructor(dom){
        super(dom);
    }
    
    Draw = {
        append(parent, child){
            parent.append(child);
        }
    }
    
    draw_drawInit(dom, parent){
        const back = parent.append(dom);
        this.draw_postion();
        this.draw_title();
        this.draw_setWidth();
        this.draw_setHeight();
        this.draw_optionVal();
        this.draw_btnTxt();
        return back;
    }

    changeWith = 1;
    draw_setWidth(){
        const self = this;    
        if(self.param.width){
            var calc = self.param.width+"%";
            self.dom[0].style.width = calc;
            if(self.changeWith == 1) {
                self.changeWith = self.changeWith + 1;
                return false;
            }
            var trueWidth;
            var windowWidth = Number(($("#center").css('width')).replace('px', ''));
            trueWidth = self.dom[0].clientWidth - 3
            self.dom[0].style.width = (trueWidth/windowWidth)*100+ '%';
        }
    }

    draw_setHeight(){
        const self = this;
        if(self.param.height){
            if(self.param.height != storeDefault.height){
                var calc = self.param.height+"%";
                self.dom[0].style.height = calc;
                var trueHeight;
                var windowHeight = Number(($("#center").css('height')).replace('px', ''));
                setTimeout(function(){
                    trueHeight = self.dom[0].clientHeight - 3
                    self.dom[0].style.height = (trueHeight/windowHeight)*100+ '%';
                }, 0);
            }
        }
    }

    draw_domHash(dom){
        var hash = this.param.hash;
        $(dom).attr('data-hash', hash);
        $(dom).attr('id',hash);
    }
    
    draw_UpDate(){
        this.draw_postion();
        this.draw_title();
        this.draw_setWidth();
        this.draw_setHeight();
        this.draw_optionVal();
        this.draw_btnTxt();
    }

    draw_postion(){
        return false;
        const param = this.param;
        var setLeft = param.X == ''?'':('left:'+Number(param.X)+'px;');
        var setTop = param.Y == ''?'':('top:'+Number(param.Y)+'px;');
        this.dom.attr('style', setLeft+setTop);
    }

    draw_title(){
        if(this.param.hasOwnProperty("title")){
            var text = this.param.title;
            if(!text){
                this.param.noTitle = true;
            }else{
                this.param.noTitle = false;
            }
            this.data_upDate();
            this.dom.find('.text').html(text);
        }
    }   

    draw_optionVal() {
        if (this.param.hasOwnProperty("optionVal")) {
            let dom = this.dom;
            let type = this.param.componentType;
            let name = this.param.name;

            let optionVal = this.param.optionVal;
            if( !Array.isArray(optionVal) ){
                return false
            }

            if( optionVal.length == 0 ){
                switch (type) {
                    case 11:
                        dom.find('select').empty();
                        break
                    case 12:
                    case 13:
                        dom.find('label').remove();
                        break

                }
            }else if (optionVal.length > 0) {
                $.each(optionVal,(i, e) => {
                    switch (type) {
                        case 11:
                            if (i == 0) {
                                dom.find('select').empty();
                            }
                            dom.find('select').append(`<option>${e.text}</option>`);
                            break
                        case 12:
                        case 13:
                            let domCheckRadioType;
                            if (type == 12) {
                                domCheckRadioType = 'checkbox'
                            } else {
                                domCheckRadioType = 'radio'
                            }
                            let checkRadioHtml = `<label><input type="${domCheckRadioType}" name="${name}"><span>${e.text}</span></label>`;
                            let prevDom;
                            if (i == 0) {
                                dom.find('label').remove();
                                prevDom = dom.find('.text');
                            } else {
                                prevDom = dom.find('label').last()
                            }
                            prevDom.after(checkRadioHtml)
                            break
                    }
                })
            }
        }
    }

    draw_btnTxt() {
        if (this.param.hasOwnProperty("btnTxt")) {
            let btnTxt = this.param.btnTxt;
            let dom = this.dom;
            dom.find('button').text(btnTxt);
        }
    }

    showDelete(){
        const dom = this.dom;
        $('.right-top').removeClass('right-top-show');
        let rightTop =  $(dom).eq(0).find('.right-top').first();
        if(dom.hasClass('type1')){
            rightTop = $(dom).eq(0).find('.right-top').last();
            if(rightTop.parent().hasClass('inputtext1')){
                rightTop = $(dom).eq(0).find('.right-top').first();
            };
        }
        rightTop.addClass('right-top-show');
    }
    
    deleteClick(){
        const self = this;
        let deletes = self.dom.find('.delete');
        if(deletes && deletes.length > 1){
            deletes = deletes.last();
        }
        deletes.on('click', 
            function(){
                self.data_delete();
                self.dom.remove();
            }
        );
    }
}

export default DrawBase;