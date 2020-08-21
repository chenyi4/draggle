/**
 * A simple, efficent mobile slider solution
 * @file drag.js
 * @author CHENYI
 *    chenyi chenyi4@qq.com
 *
 * @LICENSE https://github.com/BE-FE/iSlider/blob/master/LICENSE
 */

 //1.初始化// 和可以拖拽的方法，模块现在混淆，希望能够单个模块，不会混淆

 //2.能返回链式操作

 //返回工厂模式实现

 //drag.prototype.moveThing 可以调用 drag.prototype.moveThing.math方法，因为
 //这个function只和它自己有关系, 如何让 drag.prototype.moveThing.math 里面的this
 //指向 drag.prototype.moveThing

 //https://blog.csdn.net/IT_czh/article/details/80454070
 //对不同浏览器兼容方法的封装


(function (global) {
    'use strict';

    var drag = function (name) {
        this.start = false;
        this.dom = document.getElementsByClassName(name)[0];
        this.move = {
            org: {
                left: 0,
                top: 0
            },
            moveLength: {
                left: 0,
                top: 0
            }
        };
        this.init();
    }

    drag.prototype.init = function(){
        this.getOrginData();
        this.clickThing();
        this.moveThing();
        this.stopThing();
    }

    drag.prototype.getOrginData = function(){
        this.orgStyleData = {
            position: "relative", left: 0, top: 0
        };
        this.orgStyle = window.getComputedStyle(this.dom,null);
        this.orgStyleData.position = this.orgStyle.position;
        this.orgStyleData.left = Number(this.orgStyle.left.replace('px',''));
        this.orgStyleData.top = Number(this.orgStyle.top.replace('px', ''));
    }

    drag.prototype.clickThing = function(){
        var self = this;
        this.dom.addEventListener('mousedown',function(e){
            this.start = true;
            self.getOrginData();
            self.move = {
                org: {
                    left: e.x,
                    top: e.y
                },
                moveLength: {
                    left: 0,
                    top: 0
                }
            }

        });
    }

    drag.prototype.moveThing = function(){
        var self = this;
        this.dom.addEventListener('mousemove', function(e){
            if(this.start){
                self.move.moveLength = {
                    left: e.x,
                    top: e.y
                }
                self.math();
            }   
        });
    }
    drag.prototype.math = function(){
        var self = this;
        var x = self.move.moveLength.left - self.move.org.left;
        var y = self.move.moveLength.top - self.move.org.top;
        this.dom.style.left = this.orgStyleData.left + x + 'px';
        this.dom.style.top  = this.orgStyleData.top + y + 'px';
    }

    drag.prototype.stopThing = function(){
        this.dom.addEventListener('mouseup',function(){
            this.start = false;
        });
    }

    drag.prototype.drag = function(){

    }

    if(!window.drag){
        window.drag = drag;
    }

})(window || this);