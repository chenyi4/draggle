import Edit from './setEdit'
import drawDom from './drawDom'
import currentDate from '@/assets/js/setCurrentDate';
import eventHub from '@/event-hub/index';
require('webpack-jquery-ui');
const draw = (function(){
    //还原已经保存的图像 
    class drawCenter{
        
        constructor(){
            
        }
        
        allModules = this.getAllModules();

        init(currentDraw){
            
            this.dom = $('body');
            
            this.clearCenter();

            currentDate.clearAllDate();
          
            this.getAllModules();

            this.drawCenterDom(currentDraw);

            setTimeout(function(){
                eventHub.$emit(eventHub.center.HIDE_LOADING);
            },500);
        }

        clearCenter(){ 
            const Center = $('#center');
            Center.html('');
        }

        drawCenterDom(value){
            // leftMenus
            var initValue = value;
            const self = this;
            initValue.forEach(function(item){
                var draw = new drawDom(item);
                draw.init(self.allModules);
            });
        }
        
        getAllModules(){
            const modules = $('.leftMenus').find('.module');
            let modulesName = [];
            modules.each(function(i, dom){
                const className = $(dom).attr('class');
                modulesName.push({
                    name: className.split(' ')[0],
                    dom: $(dom).clone(),
                });
            });
            return modulesName;
        }
    }

    const DRAW = function(param){ 
        const drawback = new drawCenter(param);
        return drawback.init(param);
    }

    return DRAW;
})();



export default draw;