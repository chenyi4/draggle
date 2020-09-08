var scaleCY = function(dom){
    return new scaleCY.init(dom);
}

scaleCY.init = function(dom){
    var self = this;
    this.dom = dom

    var point = this.point = this.dom.getElementsByClassName('before')[0];
    this.position = {
        width: this.dom.offsetWidth,
        height: this.dom.offsetHeight   
    };

    this.setChange = {
        orgX: 0,
        orgY: 0,
        changeX: 0,
        changeY: 0
    }

    this.unuse = false; //禁止使用

    // var 
    this.isClick = false;
   
    point.onmousedown = function(e){
        if(self.unuse) return false;
        e.stopPropagation();
        self.isClick = true;
        self.position = {
            width: self.dom.offsetWidth,
            height: self.dom.offsetHeight
        };
        self.setChange.orgX = e.screenX;
        self.setChange.orgY = e.screenY;
        self.onmousemove();
        self.onmouseup();
    }

    
   
}

scaleCY.prototype.unuseSet = function(value){
    this.unuse = value;
}


scaleCY.prototype.getPosition = function(){
    const self = this;
    self.position = {
        width: Number((self.dom.style.width).replace('px', '')),
        height: Number((self.dom.style.height).replace('px', ''))
    };
    console.log(self.position);
}

scaleCY.init.prototype = scaleCY.prototype;

scaleCY.prototype.onmousemove = function(){
    var self = this;
    this.oldMouseMove = document.onmousemove;
    document.onmousemove = function(e){
        if(self.isClick){
            self.setChange.changeX = e.screenX;
            self.setChange.changeY = e.screenY;

            var width = self.position.width + (self.setChange.changeX - self.setChange.orgX);
            var height = self.position.height + (self.setChange.changeY - self.setChange.orgY);

            self.dom.style.width =  width >=18?width:18 + 'px';
            self.dom.style.height = height >=18?height:18 + 'px';
        }
    }
}

scaleCY.prototype.onmouseup = function(){
    var self = this;
    this.oldMouseUp = document.onmouseup;
    document.onmouseup = function(e){
        self.isClick = false;
        self.getPosition();
        document.onmousemove = self.oldMouseMove;
        document.onmouseup = self.oldMouseUp;
    }
}

export default scaleCY;
