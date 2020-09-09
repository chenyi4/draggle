import eventHub from '@/event-hub/index';
var chooseDom = function(){

    this.orgDocClick = null;
    this.orgDocMove = null;
    this.orgDocMouseUp = null;
    this.orgDBClick = null;

    this.dom = document.getElementsByClassName('chooseDom')[0];
    this.dom.style.position = "absolute";
    this.dom.style.border = "2px dashed #75b7d5";
    this.dom.style.left = -100;
    this.dom.style.top = -100;

    this.orgPosition = {
        left:0,
        top: 0,
        moveLeft: 0,
        moveTop: 0
    }

    this.isStart = false;

    this.init();
}

chooseDom.prototype.init = function(){
}

chooseDom.prototype.start = function(){
    var self = this;
    this.orgDocClick = document.onmousedown;
    document.onmousedown = function(e){
        self.isStart = true;
        self.orgPosition.moveLeft = 0;
        self.orgPosition.moveTop = 0;
        self.setPosition(0, 0, e.clientX, e.clientY);

        self.orgPosition.left = e.clientX;
        self.orgPosition.top = e.clientY;
        self.move();
        self.mouseup();
        self.orgdbclick();
    }
}

chooseDom.prototype.move = function(){
    var self = this;
    self.orgDocMove = document.onmousemove;
    document.onmousemove = function(e){
        if(!self.isStart) return false;
        self.orgPosition.moveLeft = e.clientX;
        self.orgPosition.moveTop = e.clientY;


        var width = (self.orgPosition.moveLeft - self.orgPosition.left);
        var height = (self.orgPosition.moveTop - self.orgPosition.top);
        self.setPosition(width, height);
    }
}

chooseDom.prototype.setPosition = function(width, height, left, top){
    const self = this;
    self.dom.style.width = width;
    self.dom.style.height = height;
    if(left){
        self.dom.style.left = left;
    }
    if(top){
        self.dom.style.top = top;
    }
}



chooseDom.prototype.mouseup = function(){
    var self = this;
    self.orgDocMouseUp = document.onmouseup;
    document.onmouseup = function(){
        self.isStart = false;

        document.onmouseup = self.orgDocMouseUp;
        document.onmousemove = self.orgDocMove;
        eventHub.$emit(eventHub.editBox.POST_CHOOSE_AREA, {
            left: self.orgPosition.left,
            top: self.orgPosition.top,
            endLeft: self.orgPosition.moveLeft,
            endTop: self.orgPosition.moveTop
        });

        if(self.orgPosition.moveLeft == 0 && self.orgPosition.moveTop == 0){
            self.setPosition(0, 0, -10, -10);
        }
        // document.onmousedown = self.orgDocClick;
    }
}

chooseDom.prototype.orgdbclick = function(){
    var self = this;
    self.orgDBClick = document.ondblclick;
    document.ondblclick = function(){
        eventHub.$emit(eventHub.editBox.CHOOSE_AREA, false);
        self.close();
    }
}

chooseDom.prototype.close = function(){
    const self = this;
    document.onmousedown = self.orgDocClick;
    document.onmouseup = self.orgDocMouseUp;
    document.onmousemove = self.orgDocMove;
    document.ondblclick = self.orgDBClick;
}


export default chooseDom;