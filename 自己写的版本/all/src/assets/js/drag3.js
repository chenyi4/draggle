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

    drag.store = [];

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
        this.position = {
            offsetTop: 0,
            offsetLeft: 0,
            offsetRight: 0,
            offsetBotton: 0,
            width: 0,
            height: 0
        }
        this.endPosition = {
            left: null,
            top: null
        }

        self.getDomPosition();

        this.isStart = false;
        this.orgDocumentMoveThing = null;
        this.orgDocuemntMouseUp = null;
    }

    drag.fn.extend({
       getDomPosition(){
            const self = this;
            var dom = null;
            this.orgStyleData = {};
            this.orgStyle = document.defaultView.getComputedStyle(self.orgDom,null);
            dom = self.orgDom;
            if(self.moveSelect){
                dom = self.moveDom;
                this.orgStyle = document.defaultView.getComputedStyle(self.moveDom,null);
            }
            
            var obj;
            var style = document.defaultView.getComputedStyle(self.dom,null);
            var position = style.position;
            if(position == 'relative' || position == 'absolute'){
                obj = {
                    left: Number((style.left).replace('px', '')),
                    top: Number((style.top).replace('px', ''))
                }
            }else{
                obj = self.getTruePosition(dom);
            }
            
            this.orgStyleData.left = obj.left;
            this.orgStyleData.top = obj.top;

       },
       getTruePosition(dom){
            var iTop = 0, iLeft = 0;
            do {    
                iTop += dom.offsetTop;
                iLeft += dom.offsetLeft;
                dom = dom.parentNode;
            }while (dom.parentNode);
            return {
                left: iLeft,
                top: iTop
            }
       },
       setPosition(){
         this.position = {
            offsetTop: this.dom.offsetTop,
            offsetLeft: this.dom.offsetLeft,
            width: this.dom.offsetWidth,
            height: this.dom.offsetHeight,
            offsetRight: this.dom.offsetLeft+this.dom.offsetWidth,
            offsetBottom: this.dom.offsetTop+this.dom.offsetHeight,
         };
       }
    });

    drag.fn.moveThing = function(){
        this.startClick();
    }

    drag.fn.extend({
        test: function(){
            console.log("测试");
        },
        startClick: function(){
            var self = this;
            this.dom.addEventListener('mousedown',function(e){
                self.getDomPosition();
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
                    var dom = self.dom = self.helper(self.orgDom);
                    self.getDomPosition();
                    dom.style.left = self.orgStyleData.left+"px";
                    dom.style.top = self.orgStyleData.top+"px";

                    // dom.style.left = 111+"px";
                    // dom.style.top = 111+"px";
                    document.body.appendChild(dom);
                    drag({
                        dom: dom,   
                        param: Object.assign(self.param||{}, {
                            isCopy: false,
                            helper: false,
                            stop: null,
                            orgDom: self.orgDom
                        })
                    });
                }
                self.isStart = true;
                self.mouseMove();
                self.mouseUp();
            });
            return this;
        },
        mouseMove: function(){
            const self = this;
            if(self.isStart){
                self.orgDocumentMoveThing = document.onmousemove;
                document.onmousemove = function(e){
                    self.move.moveLength = {
                        left: e.x,
                        top: e.y
                    }
                    self.orgMove();
                    self.changeClassName();
                    self.changeMoveThing();
                }
            }
        },
        changeClassName: function(){
            const self = this;
            if(!self.isChangeClassName){
                var className = self.dom.className;
                self.dom.className =  className + ' drag-cy';  
                if(self.accept){
                    var className = self.dom.className;
                    self.dom.className =  className + ' accept-cy';  
                }  
                self.isChangeClassName = true;
            }
        },
        mouseUp: function(){
            const self = this;
            self.orgDocuemntMouseUp = document.mouseUp;
            document.onmouseup = function(e){
                self.isStart = false;
                document.onmousemove = self.orgDocumentMoveThing;
                document.mouseUp = self.orgDocuemntMouseUp;
                self.setPosition();
                self.isAccept();
                if(self.stop){
                    self.stop(self.dom, self);
                }
                self.setEndPosition();
                document.onmouseup = self.orgDocuemntMouseUp;
            }
        },
        setEndPosition(){
            const self = this;
            self.endPosition = {
                left: Number((this.dom.style.left).replace('px', '')),
                top: Number((this.dom.style.top).replace('px', ''))
            };

        },
        isAccept(){
            var self = this;
            drag.store.forEach((item) => {
                if(item.dom != self.dom){
                    item.setPosition();  
                    if(item.position.offsetLeft < (self.position.offsetLeft+ (self.position.width/2))){
                        if(item.position.offsetRight > (self.position.offsetLeft + (self.position.width/2))){
                            if(item.position.offsetTop < (self.position.offsetTop + (self.position.height/2))){
                                if(item.position.offsetBottom > (self.position.offsetBottom - (self.position.height/2))){
                                    if(item.accept){
                                        item.accept(self.dom, item.dom);
                                    }
                                }
                            }
                        }
                    }
                }
            });
        },
        changeMoveThing: function(){
            const self = this;
            var x = self.move.moveLength.left - self.move.org.left;
            var y = self.move.moveLength.top - self.move.org.top;
            var dom = null;
            if(this.moveSelect){
                dom = this.moveDom;
            }else{
                dom = this.dom;
                // this.dom.style.left = this.orgStyleData.left + x + 'px';
                // this.dom.style.top = this.orgStyleData.top + y + 'px';
            }

            dom.style.left = this.orgStyleData.left + x + 'px';
            dom.style.top = this.orgStyleData.top + y + 'px';

            return self.endPosition;
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
            this.stop = this.param.stop;
            this.accept = this.param.accept;
            this.moveSelect = this.param.moveSelect||'';
            if(this.moveSelect){
                this.moveDom = document.getElementsByClassName(this.moveSelect)[0];
            }
            this.orgMove = this.param.orgMove?this.param.orgMove: function(){};
            //
            this.isChangeClassName = false; 
        }
    }
   
    drag.init = function(param){
        if(param.dom){
            this.param = param.param;
            this.setParam();
            this.isCopy = false;
            this.dom = param.dom;
            this.orgDom = param.param.orgDom;
            this.orgPosition();
            this.moveThing();
            drag.store.push(this);
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

export default window.drag;

//限制组件不可超出屏幕，禁止移除屏幕以外