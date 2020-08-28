class Outputdata {
    constructor(){
        this.init();
    }

    init(){
        
    }

    add(orgData, value){
        let orgDataAll = JSON.parse(JSON.stringify(orgData));
        const pushData = JSON.parse(JSON.stringify(value.value));
        orgDataAll.push(pushData);
        return orgDataAll;
    }

    delete(orgData, value){
        const self = this;
        const deleteData = JSON.parse(JSON.stringify(value.value));
        let orgDataAll = JSON.parse(JSON.stringify(orgData));
        let delectNode = [];
        orgDataAll.forEach((item, key) => {
                if(item.hash == deleteData.hash){
                    if(item.children && item.children.length){
                        delectNode = self.delete_input(orgDataAll, item);
                    }
                    orgDataAll.splice(key, 1);
                }
        });
        delectNode.forEach((node, key)=>{
            orgDataAll.forEach((item, i)=>{
                if(item.hash == node){
                    orgDataAll.splice(i, 1);
                }
            });
        });
        orgDataAll.forEach((item, key) => {
            if(item.parentHash == deleteData.hash){
                orgDataAll.splice(key, 1);
             }
        });
        return orgDataAll;
    }

    delete_input(orgDataAll, item){
        const children = item.children;
        var hashs = [];
        children.forEach((dom, i) => {
            const hash = dom.hash;
            orgDataAll.forEach((item, key) => {
                if(item.parentHash == hash){
                    hashs.push(orgDataAll[key].hash);
                }
            });
        });
        return hashs;
        //domHash 循环和 orgDataAll里面的组件的parentHash比较，如果能对上，就去删除orgDataAll里面的这个值
    }

    updata(orgDataAll, value){
        const oldData = JSON.parse(JSON.stringify(value.value));
        let orgDataAlls = JSON.parse(JSON.stringify(orgDataAll));
        orgDataAlls.forEach((item, key)=>{
            if(item.hash == oldData.hash){
                const beforeData = orgDataAlls[key];
                orgDataAlls[key] =  oldData;
                if(!oldData.parentHash){
                    orgDataAlls[key].parentHash = beforeData.parentHash; 
                }
            }
        });
        return orgDataAlls;
    }

}

export default Outputdata;