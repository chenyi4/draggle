(function(){
    var scaleCY = function(name){
        return new scaleCY.init(name);
    }

    scaleCY.init = function(name){
        var self = this;
        this.dom = document.getElementsByClassName(name)[0];
        console.log(name);

        var point = this.dom.getElementsByClassName('before')[0];
        var position = {
            width: this.dom.offsetWidth,
            height: this.dom.offsetHeight
        };

        var setChange = {
            orgX: 0,
            orgY: 0,
            changeX: 0,
            changeY: 0
        }

        var isClick = false;
        point.onmousedown = function(e){
            isClick = true;
            position = {
                width: self.dom.offsetWidth,
                height: self.dom.offsetHeight
            };
            setChange.orgX = e.screenX;
            setChange.orgY = e.screenY;
        }

        document.onmousemove = function(e){
            if(isClick){
                setChange.changeX = e.screenX;
                setChange.changeY = e.screenY;

                var width = position.width + (setChange.changeX - setChange.orgX);
                var height = position.height + (setChange.changeY - setChange.orgY);

                self.dom.style.width =  width >=18?width:18 + 'px';
                self.dom.style.height = height >=18?height:18 + 'px';
            }
        }

        document.onmouseup = function(e){
            isClick = false;
            var position = {
                width: self.dom.offsetWidth,
                height:self.dom.offsetHeight
            };
        }
    }
    window.scaleCY = scaleCY;
})(window);