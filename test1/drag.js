/**
 * A simple, efficent mobile slider solution
 * @file drag.js
 * @author CHENYI
 *    chenyi chenyi4@qq.com
 *
 * @LICENSE https://github.com/BE-FE/iSlider/blob/master/LICENSE
 */

 
(function (global) {
    'use strict';

    var drag = function () {
        this.name = "sdss";
    }
    
    if(!window.drag){
        window.drag = drag;
    }

})(window || this);