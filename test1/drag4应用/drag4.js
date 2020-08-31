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
            this.orgStyle = document.defaultView.getComputedStyle(self.dom,null);
            dom = self.dom;
            if(self.moveSelect){
                dom = self.moveDom;
                this.orgStyle = document.defaultView.getComputedStyle(self.moveDom,null);
            }
            var obj = self.getTruePosition(dom);
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
         var obj = this.getTruePosition(this.dom);
         this.position = {
            offsetTop: obj.top,
            offsetLeft: obj.left,
            width: this.dom.offsetWidth,
            height: this.dom.offsetHeight,
            offsetRight: obj.left + this.dom.offsetWidth,
            offsetBottom: obj.top + this.dom.offsetHeight,
         };
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
                    var dom = self.dom = self.helper(self.orgDom);
                    dom.style.left = self.orgStyleData.left+"px";
                    dom.style.top = self.orgStyleData.top+"px";
                    document.body.appendChild(dom);
                    drag({
                        dom: dom,   
                        param: Object.assign(self.param||{}, {
                            isCopy: false,
                            helper: false
                        })
                    });
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
                console.log("=========执行");
                if(self.stop){
                    self.stop(self.dom);
                }
            }
        },
        isAccept(){
            var self = this;
            console.log(drag.store);
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
            if(this.moveSelect){
                this.moveDom.style.left = this.orgStyleData.left + x + 'px';
                this.moveDom.style.top = this.orgStyleData.top + y + 'px';
            }else{
                this.dom.style.left = this.orgStyleData.left + x + 'px';
                this.dom.style.top = this.orgStyleData.top + y + 'px';
            }
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
