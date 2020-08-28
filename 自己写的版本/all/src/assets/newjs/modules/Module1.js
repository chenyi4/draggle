import Edits from './../edit/edit.js'
import { storeDefault } from '@/store/defaultDate'
class Module1 extends Edits{ //输出模块的demo
    constructor(dom){
        super(dom);
    }

    droppableDrop(dom,draggable){
        const self = this;
        var isNext = true;
        // setTimeout(function(){
        //     draw.state.allObjectSave.forEach((item, key) => {
        //         if(item.param.parentHash == self.param.hash){
        //             if(item.isAccept){
        //                 isNext = false;
        //                 draw.state.allObjectSave[key].isAccept = false;
        //             }
        //         }
        //     });
        //     if(isNext){
        //         self.droppableDropTrue(dom,draggable);
        //     }else{

        //     }
        // },2);
        self.droppableDropTrue(dom,draggable);
        return false;
       
    }

    droppableDropTrue(dom,draggable){
        super.droppableDrop(dom,draggable);
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
}

export default Module1;