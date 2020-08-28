import edit from '@/assets/js/setEdit';
import store from '@/store/index';
import currentDate from '@/assets/js/setCurrentDate';
import localStorage from '@/assets/js/localStorage'
import eventHub from '@/event-hub/index';
import drawDom from './drawDom'
import message from './common.message'
const domPermission = (function(){
    class domPermission{
        constructor(dom){
            this.dom = dom;
            this.parentName = edit.prototype.getDomName.call(this);
            this.parentParam = JSON.parse(JSON.stringify(store.state[this.parentName].param));
            this.parentPermission = this.parentParam.permissionNum;
        }    

        getDomPermission(dom){ //获取放入元素的参数值
            this.childDom = dom.draggable[0];
            this.domName = edit.prototype.getDomName.call(this,dom.draggable);
            this.domHash = currentDate.getModuleHash($(this.childDom));
            this.domomParam = JSON.parse(JSON.stringify(store.state[this.domName].param));
            this.permission = this.domomParam.permissionNum;
        }

        isPermission(dom, fn){
            const self = this;
            this.getDomPermission(dom);
            if(this.parentPermission > this.permission){
                //设置父元素的
                const param = currentDate.addModuleParent(this.dom, this.domName, this.childDom, this.domHash);
                fn
            }
            else if(this.parentPermission < this.permission){
                eventHub.$emit(eventHub.notify.ERROR, message.notice.noPermission);
                setTimeout(function(){
                    localStorage.beforeDate();
                },0);
            }else{
                console.log('同级别');
            }
        }
    } 

    return domPermission;

})();

export default domPermission;