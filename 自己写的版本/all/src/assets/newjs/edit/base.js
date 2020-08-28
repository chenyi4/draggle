
class Base{
    constructor(dom){
        if(dom instanceof HTMLElement){
            this.dom = $(dom);
            this.getName();
        }
    }

    getName(){ //获取dom的名字
        const trueDom = this.dom
        const className = trueDom.attr('class').split(' ')[0];
        this.className = className;
    }

    getDom(dom, allModules){
        let back;
        allModules.forEach((item) => {
            if(item.name == dom.module){
                back = (item.dom.clone());
            };
        });
        return back;
    }

}

export default Base;