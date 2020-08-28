(function(){
    var a = document.getElementsByClassName('a')[0];
    var point = a.getElementsByClassName('before')[0];
    var position = {
        width: a.offsetWidth,
        height: a.offsetHeight
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
            width: a.offsetWidth,
            height: a.offsetHeight
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

            a.style.width =  width >=18?width:18 + 'px';
            a.style.height = height >=18?height:18 + 'px';
        }
    }

    document.onmouseup = function(e){
        isClick = false;
        var position = {
            width: a.offsetWidth,
            height: a.offsetHeight
        };
        console.log(position);
    }
})();