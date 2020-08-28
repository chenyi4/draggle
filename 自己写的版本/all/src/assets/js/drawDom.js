import Edit from './setEdit'
import currentDate from '@/assets/js/setCurrentDate';
import edit from '@/assets/js/setEdit';
const drawDom = (function(){
    class drawDom{
        constructor(item){
            this.item = item||null;
        }
        
        center = $('.center');
        init(allModules){
            this.drawInCenter(allModules);
        }
        
        drawInCenter(allModules){
            const self = this;
            const name = this.item.module;
            let appendDom;
            let param = this.item.param;
            let hash = this.item.hash;
            allModules.forEach(function(item, i){
                if(item.name == name){
                    appendDom = ((item.dom).clone())[0];
                };
            });
            
            center.append(appendDom);
            if(typeof Edit != "undefined"){
                var edit = new Edit(appendDom, param, hash);
                edit.init();
            }
            self.setPosition(appendDom, param);
        } 

        /* 初始化 或者 根据 右边的参数去设置Dom 都在这里设置 */
        setPosition(dom, param){
            //currentDate.updateModuleDate(dom, param); 
            //去更新模块里面的参数值
            if(param.title && param.title != $(dom).find('.text').html()){
                drawText.prototype.setPosition.call(this, dom, param);
            }

            $(dom).css({
                // left: param.left?Number(param.left):0,
                // top: param.top?Number(param.top):0,
            });
        }

        domAppend(parentDom, childDom){
            parentDom.append(childDom);
            childDom.removeAttr("style");
            new edit(childDom);
        }

        showDelete(dom){
           $('.right-top').removeClass('right-top-show');
           let rightTop;
           rightTop =  $(dom).eq(0).find('.right-top').first()
           if($(dom).hasClass('type1')){
             console.log(rightTop.parent());
             rightTop =  $(dom).eq(0).find('.right-top').last()
           }
           rightTop.addClass('right-top-show');
        }
        
        deleteDom(dom){
            dom.remove();
        }
    }

    class drawText{
        setPosition(dom, param){
            $(dom).find('.text').html(param.title);
        }
    }

    return drawDom
})();





export default drawDom;