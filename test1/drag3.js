/**
 * A simple, efficent mobile slider solution
 * @file drag.js
 * @author CHENYI
 *    chenyi chenyi4@qq.com
 *
 * @LICENSE https://github.com/BE-FE/iSlider/blob/master/LICENSE
 */

 //1.初始化// 和可以拖拽的方法，模块现在混淆，希望能够单个模块，不会混淆
 //实现了

 //2.能返回链式操作

 //返回工厂模式实现

 //drag.prototype.moveThing 可以调用 drag.prototype.moveThing.math方法，因为
 //这个function只和它自己有关系, 如何让 drag.prototype.moveThing.math 里面的this
 //指向 drag.prototype.moveThing

 //https://blog.csdn.net/IT_czh/article/details/80454070
 //对不同浏览器兼容方法的封装

//startClick  这种内部方法，希望可以被其方法调用，但是不想被组件访问到

(function (global) {

    'use strict';
    var drag = function(param){
        return new drag.init(param);
    }

    drag.prototype = drag.fn = {
        type: "1.1.0",
        setParam: function(){},
        orgPosition: function(){},
        moveThing: function(){},
        extend: function(){}
    };

    drag.fn.extend = function(){
        var value = arguments[ 0 ] || {};
        for(var item in value){
            drag.fn[item] = value[item];
        }
    }
    
    drag.fn.orgPosition = function(){
        const self = this;
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

        self.getDomPosition();

        this.isStart = false;
        this.orgDocumentMoveThing = null;
        this.orgDocuemntMouseUp = null;
    }

    drag.fn.extend({
       getDomPosition(){
            const self = this;
            this.orgStyle = document.defaultView.getComputedStyle(self.dom,null);
            this.orgStyleData = {};
            if(self.orgStyle){
                this.orgStyleData.left = Number((String(this.orgStyle.left)).replace('px',''));
                this.orgStyleData.top = Number((String(this.orgStyle.top)).replace('px',''));
            }
       }
    });

    drag.fn.moveThing = function(){
        this.startClick();
    }

    drag.fn.extend({
        startClick: function(){
            var self = this;
            this.dom.addEventListener('mousedown',function(e){
                self.move.org = {
                    left: e.x,
                    top: e.y
                };
                if(self.isCopy){
                    self.dom = self.orgDom.cloneNode(true);
                    document.body.appendChild(self.dom);
                    drag({
                        dom: self.dom,   
                        param: Object.assign(self.param||{}, {
                            isCopy: false
                        })
                    });
                }
                if(self.helper){
                    self.dom = self.helper(self.dom);
                    document.body.appendChild(self.dom);
                }
                self.isStart = true;
                self.getDomPosition();
                self.mouseMove();
                self.mouseUp();
            });
            return this;
        },
        mouseMove: function(){
            const self = this;
            self.orgDocumentMoveThing = document.onmousemove;
            document.onmousemove = function(e){
                if(self.isStart){
                    self.move.moveLength = {
                        left: e.x,
                        top: e.y
                    }
                    self.changeMoveThing();
                }
            }
        },
        mouseUp: function(){
            const self = this;
            self.orgDocuemntMouseUp = document.mouseUp;
            document.onmouseup = function(e){
                self.isStart = false;
                document.onmousemove = self.orgDocumentMoveThing;
                document.mouseUp = self.orgDocuemntMouseUp;
            }
        },
        changeMoveThing: function(){
            const self = this;
            var x = self.move.moveLength.left - self.move.org.left;
            var y = self.move.moveLength.top - self.move.org.top;
            this.dom.style.left = this.orgStyleData.left + x + 'px';
            this.dom.style.top = this.orgStyleData.top + y + 'px';
        }
    });

     /**
     * @param {*} param 
     * 初始化参数值
     * select 选择器
     */
    drag.fn.setParam = function(){
        if(this.param){
            this.select = this.param.select?this.param.select:'';
            this.orgDom = document.getElementsByClassName(this.select)[0]||new drag();
            this.dom = this.orgDom;
            this.isCopy = this.param.isCopy?true:false;
            this.helper = this.param.helper;
            
        }
    }
   
    drag.init = function(param){
        if(param.dom){
            this.param = param.param;
            this.setParam();
            this.isCopy = false;
            this.dom = param.dom;
            this.dom.style.position = "fixed";
            this.orgPosition();
            this.moveThing();
        }else{
            this.param = param;
            this.setParam();
            this.orgPosition();
            this.moveThing();
        }
        
    }

    drag.init.prototype = drag.fn; 

    //*******// 测试内容 */
    if(!window.drag){
        window.drag = drag;
    }

})(window || this);