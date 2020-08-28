import centerMouse from '@/assets/js/mouse.centerMouse';
const rightSetMouse = (function(){
    class rightSetMouse extends centerMouse{
        constructor(dom){  
            super(dom); //继承构造 等同***.call(); (constructor stealing)
            this.click = false;
            this.domMove();
        }
        mouseDown(e){
            //扩展父类的方法
            super.mouseDown(e);

            const dom = this.dom;
            dom.addClass('right-fixed-set');
            const top = Number(dom.css('top').replace('px',''));
            if(top < 20){ 
                dom.removeClass('right-fixed-set');
            }
            else{
                dom.addClass('right-fixed-set');
                
            }
            this.changeRight();
        }

        changeRight(){
            const dom = this.dom;
            // if(dom.hasClass('right-fixed-set')){
            //     $('.center-all').css({
            //         'width': '82.5%'
            //     })
            // }
            // else{
            //     $('.center-all').css({
            //         'width': '62.5%'
            //     })
            // }
        }
    }
   
    return rightSetMouse; 
})();

export default rightSetMouse;