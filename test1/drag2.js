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
        if(name){
            this.dom = document.getElementsByClassName(name)[0];
            console.log(name);
        }
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
        var self = this;
        this.saveDocumentMove = null;
        this.saveonMouseUp = null;
        // document.onmousemove = function(e){
        //     self.move();
        // }
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
        if(this.dom){
            this.orgStyle = window.getComputedStyle(this.dom,null);
            this.orgStyleData.position = this.orgStyle.position;
            this.orgStyleData.left = Number(this.orgStyle.left.replace('px',''));
            this.orgStyleData.top = Number(this.orgStyle.top.replace('px', ''));
        }
    }

    drag.prototype.clickThing = function(){
        var self = this;
        if(this.dom){
            this.dom.addEventListener('mousedown',function(e){
                drag.current = self;
                self.start = true;
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
                if(document.onmousemove){
                    self.saveDocumentMove = document.onmousemove;
                }
                if(document.onmouseup){
                    self.saveonMouseUp = document.onmouseup;
                }
                document.onmousemove = function(e){
                    if(drag.current.dom){
                        drag.current.moveThing(e);
                    }
                }
            });
        }
    }
    drag.prototype.moveUp = function(){
        console.log(this.start);
        if(this.start){
            console.log("测试");
        }
    }

    drag.prototype.moveThing = function(e){
        var self = this;
        if(self.start){
            self.move.moveLength = {
                left: e.x,
                top: e.y
            }
            self.math();
        }else{

        }
        
    }
    drag.prototype.math = function(){
        var self = this;
        var x = self.move.moveLength.left - self.move.org.left;
        var y = self.move.moveLength.top - self.move.org.top;
        this.dom.style.left = this.orgStyleData.left + x + 'px';
        this.dom.style.top  = this.orgStyleData.top + y + 'px';
    }

    drag.prototype.stopThing = function(){
        var self = this;
        if(this.dom){
            document.onmouseup = function(){
                self.start = false;
                document.onmousemove = self.saveDocumentMove;
            };
        }
    }

    drag.prototype.drag = function(){

    }

    if(!window.drag){
        window.drag = drag;
    }

})(window || this);