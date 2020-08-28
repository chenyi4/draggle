class Back{
    constructor(type){
        let initAll;
        this.age = 222;
        switch(type){
            case 'Type1': 
                initAll = new Type1();
            case 'Type1': 
                initAll = new Base();
        }
        return initAll;
    }
}

class DrawBase{
    draw(){
        console.log('绘制开始的');
        console.log(this.xixi);
    }
}

class DrawBase2 extends DrawBase{
    draw2(){
        console.log('绘制开始的22');
    }
}


class DateBase extends DrawBase{
    names = 'aksjdksj';
    setDate(){
        console.log('这是基础数据处理');
    }
}

class Base extends DateBase{
    constructor(){
        super();
        this.xixi="我是一只小小小小鸟！哦";
    }
}




class Type1 extends Base{
    constructor(){
        super();
    }
    edit(){
        new Base();
    }

    date(){
    }
}


class Module1 extends Base{
    constructor(){
        super();
    }
    edit(){
        
    }
}

class InputType1 extends Base{
    edit(){
        
    }
}

class example extends Base{ //输出模块的demo
    constructor(){
        super();
    }
    edit(){
        super.edit();
        //继承改写
    }

    draw(){
        //重写
    }

    date(){

    }
}


export default Back;