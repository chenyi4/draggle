const Utils = {
    deepCopy: function(obj, cache = []) {
        // typeof [] => 'object'
        // typeof {} => 'object'
        if (obj === null || typeof obj !== 'object') {
        return obj
        }
        // 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
        /**
         * 类似下面这种
         * var a = {b:1}
         * a.c = a
         * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
         */
        const hit = cache.filter(c => c.original === obj)[0]
        if (hit) {
        return hit.copy
        }
    
        const copy = Array.isArray(obj) ?  [] :   {}
        // 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
        cache.push({
            original: obj,
            copy
        })

        Object.keys(obj).forEach(key => {
             copy[key] = Utils.deepCopy(obj[key], cache)
        })
    
        return copy
  },
  drawCenter(){
    if($('#center').find('.cover-over').length == 0){
        $('#center').append(`
            <div class="cover-over"></div>
        `);
    }
  },
  clearCover(){
    $('#center').find('.cover-over').remove();
  },
  isKeyDown: false,
  onkeydown: function(){ 
      if(document.onkeydown){
          return false;
      }
      document.onkeydown = function(evt){
            evt = (evt) ? evt : window.event;
            if (evt.keyCode == 32) {
                Utils.isKeyDown = true;
                Utils.drawCenter();
            }
      }
  },
  onkeyup: function(){ 
    if(window.document.onkeyup){
        return false;
    }
    document.onkeyup = function(evt){
            evt = (evt) ? evt : window.event;
            if (evt.keyCode == 32) {
                Utils.isKeyDown = false;
                Utils.clearCover();
            }
      }
  },
  MathRadom: function(){
      return Math.ceil(Date.parse(new Date()) + Math.random()*19);
  }
}
Utils.onkeydown();
Utils.onkeyup();
export default Utils;