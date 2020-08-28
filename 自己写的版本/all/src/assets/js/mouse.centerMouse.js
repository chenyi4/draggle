import Utils from '@/assets/js/utils';
import eventHub from '@/event-hub/index';
const centerMouse = (function(){
    class centerMouse{
        constructor(dom, isSet = false){
            this.dom  = dom;
            this.isSet = isSet;
            this.mousedown = false;
            this.org = {
                x: 0,
                y: 0
            };
            this.move = {
                x: 0,
                y: 0
            }   
        }    

        init(){
            const self = this;
            this.setPostion(0, 0);
            this.domMove();
            this.clickThing();
        }

        clickThing(){
            if(this.isSet)  return false;
            this.dom[0].addEventListener('click', function (e) {
                eventHub.$emit(eventHub.setright.SER_PAGE_PARAM);
            }, false);
        }


        addScene(){
            
        }

        mouseDown(e){
            const self = this;
            const dom = this.dom;
            self.mousedown = true;
            self.org = {
                x: e.x - Number($(dom).css('left').replace('px','')),
                y: e.y - Number($(dom).css('top').replace('px',''))
            }
        }

        domMove(){
           const self = this;
           const dom = this.dom;
           this.dom[0].addEventListener('mousedown', e=>{
               self.mouseDown(e);
           });
           this.dom[0].addEventListener('mousemove', e=>{
               if(Utils.isKeyDown && self.mousedown){
                   self.move = {
                      x: e.x,
                      y: e.y
                   }
                   self.setPostion(self.move.x - self.org.x, self.move.y - self.org.y);
               }
           });

           this.dom[0].addEventListener('mouseup', e=>{
                self.mousedown = false;
           });

           this.dom[0].addEventListener('dblclick', ()=>{
              if(Utils.isKeyDown){
                 self.setPostion(0, 0);
                 eventHub.$emit(eventHub.changewindow.SCALE_SET, 1);
              }
           });
        }

        setPostion(x, y){
            const self = this;
            if(Utils.isKeyDown){
                const dom = this.dom;
                $(dom).css({
                    left: x,
                    top: y
                });
            }
        }
    }

    return centerMouse;
})();

export default centerMouse;