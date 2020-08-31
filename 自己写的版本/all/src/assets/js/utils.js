var utils = {
    getPosition(dom){
        var width = dom.offsetWidth;
        var height = dom.offsetHeight;
        var iTop = 0, iLeft = 0;
        do {    
            iTop += dom.offsetTop;
            iLeft += dom.offsetLeft;
            dom = dom.parentNode;
            // console.log(dom.offsetTop);
        }while (dom.parentNode);
        
        return {
            left: iLeft,
            top: iTop,
            width: width,
            height: height
        }
    }
}

export default utils;