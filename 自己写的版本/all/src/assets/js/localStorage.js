import Utils from './utils'
import DRAW from '@/assets/js/drawCenter';
import store from '@/store/index'
const localStore = (function(){
    class localStore {
        step = 10;
        saveDate(date){
         
            let newDate = Utils.deepCopy(date);
            date.forEach(function(dom, i){
                delete(newDate[i].dom);
            });
            let orgDate = this.getDate()||[];
            if(orgDate.length >= this.step){
                orgDate.splice(0,1);
            }
            orgDate.push(newDate);
            //http://www.ruanyifeng.com/blog/2018/07/indexeddb.html 用前端数据来处理
            //前端数据存储
            // localStorage.setItem("localdate", JSON.stringify(orgDate));
            // store.commit('setLocalStoreNum', orgDate.length);
        }

        getDate(){
            const localdate = localStorage.getItem('localdate');
            return JSON.parse(localdate);
        }
        
        clearDate(){
            localStorage.removeItem('localdate');
        }

        beforeDate(){
            const date = this.getDate();
            store.commit('setLocalStoreNum', store.state.date.localStoreNum-2);
            DRAW(date[store.state.date.localStoreNum]);
        }
        
        beforeDate(){
            const date = this.getDate();
            store.commit('setLocalStoreNum', store.state.date.localStoreNum-2);
            DRAW(date[store.state.date.localStoreNum]);
        }

        nextDate(){
            const date = this.getDate();
            DRAW(date[date.length-1]);
        }
    }
    return (function(){
        let back = null;
        if(!store.state.date.localDate){
            back = store.state.date.localDate = new localStore();
        }
        else{
            back = store.state.date.localDate;
        }
        return back;
    })()
})();


export default localStore;