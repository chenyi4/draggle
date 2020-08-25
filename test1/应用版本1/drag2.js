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
            console.log(document.getElementsByClassName(name));
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
                        // self.mathParent();
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
        
        //console.log('left:'+ (this.orgStyleData.left + x)); //相对于屏幕的位置
        //console.log('top:'+ (this.orgStyleData.top + y)); //相对于屏幕的位置
    }

    drag.prototype.stopThing = function(){
        var self = this;
        if(this.dom){
            document.onmouseup = function(){
                self.start = false;
                document.onmousemove = self.saveDocumentMove;
                self.mathParent();
            };
        }
    }

    drag.prototype.drag = function(){

    }

    drag.prototype.setParent = function(obj){
        this.ParentOrgObj = obj; 
       
    }

    drag.prototype.mathParent = function(){
        var self = this;
        var dom = document.getElementsByClassName(this.ParentOrgObj.name)[0];
        var widthLength = this.ParentOrgObj.width;
        var heightLength = this.ParentOrgObj.height;
        this.Parent = {
            dom: dom,
            y: dom.offsetTop,
            x: dom.offsetLeft,
            width: dom.clientWidth,
            height: dom.clientHeight,
            childNumber:  widthLength * heightLength 
        }
        var array = [];
       

        for( var i = 0; i< this.Parent.childNumber; i = i+1 ){
            var width = this.Parent.width/widthLength;
            var height = this.Parent.height/heightLength;
            var lefti = (i+widthLength+1)%widthLength;
            lefti = lefti== 0?widthLength:lefti;
            var topi = Math.ceil((i+1)/height)-1;
            array.push({
                num: i+1,
                left: this.Parent.x+width*(lefti-1)+1,//this.Parent.x + 
                right: this.Parent.x+width*(lefti),
                top: this.Parent.y+height*topi+1,
                bottom: this.Parent.y+height*(topi+1)
            });
        }

        var number = null;
        console.log(array);
        array.forEach((dom, i) => {
            if(dom.left < this.dom.offsetLeft){
                if(dom.right > (this.dom.offsetLeft + this.dom.clientWidth)){
                    if(dom.top < this.dom.offsetTop){
                        if(dom.bottom > (this.dom.offsetTop + this.dom.clientHeight)){
                            console.log(dom);
                            number = dom.num;
                        }
                    }
                }
            }
        });
        // console.log(number);
        // console.log(this.Parent.childNumber);
        // // console.log("计算树");
        // console.log(this.Parent);
        // console.log(this.dom.offsetTop);
        // console.log(this.dom.offsetLeft);
        self.parentChangColor(number);
    }

    drag.prototype.parentChangColor = function(number){
        var self = this;
        var child = this.Parent.dom.getElementsByTagName('div');
        // child.forEach((dom) => {
        //     dom.style.backgroundColor = "grey"
        // });
        
        if(child[number-1] != this.parentChild){
            this.parentChild = child[number-1];
            if(this.parentChild){
                for(var i = 0; i < child.length; i = i + 1){
                    child[i].style.backgroundColor = "grey"
                }
                this.parentChild.style.backgroundColor = "black";
                self.dom.style.backgroundColor = "red";
                // document.appendChild(self.dom);
                
                self.parentChild.appendChild(self.dom);
                // console.log(self.dom);
            }
        }
    }

    if(!window.drag){
        window.drag = drag;
    }

})(window || this);