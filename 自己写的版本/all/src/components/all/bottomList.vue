<template>
    <div>
        <div class="bottomList"  @mousemove="change"></div>
        <div :class="{'bottomAllList':true, 'bottomAllList-dis': !isShowAll, 'bottomAllList-change': isHoverButton || isClickButton}">
            <div class="button-box" >
                <div :class="{'title':true, 'title-choose': currentChoose == key && (isHoverButton||isClickButton) }" 
                    v-for="(item, key) in lists" :key="key" 
                    @click.stop="clickButoonThing(key)"
                    @mouseenter="hoverButton(key)" 
                    @mouseleave="leaveButton">
                        {{item.name}}
                </div>
            </div>
            <div class="el-icon-caret-bottom hidden" @click="hiddenAllBottom"></div>
        </div>
        <div 
            :class="{'ListDetail':true, 'ListDetail-hidden': !isHoverButton && !isClickButton}"
            @click.stop="hiddenAllBottom"
        >
            <div>
                <div class="allMenuBox">
                    <div v-for="(item, key) in showTableList" @click.stop="consoleTest(key)"  :class="['menu', 'menu-'+key]" :key="key">
                        {{item.name}}
                        <span v-if="typeof(item.isShow) == 'boolean'">
                            <i class="el-icon-success" v-if="item.isShow"></i>
                            <i class="el-icon-error" v-if="!item.isShow"></i>
                        </span>
                    </div>
                    <div class="menu-close">
                        <i 
                            class="el-icon-close" 
                            v-if="showTableList.length"
                            @click.stop="consoleTest('false')">
                        </i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'bottomList', //底部菜单
  components: {

  },    
  data() {
    return {
        lists: [
            {
                name: "画布设置",
                list: [
                   {
                        name: "body设置",
                        value: 'bodySet'
                   },
                   {
                        name: "缩小放大画布栏",
                        value: 'scaleDraw',
                        isShow: false
                   }, 
                ]
            },
            {
                name: "菜单",
                list: [
                    {
                        name: "历史记录",
                        value: 'hisTory',
                        isShow: false
                    },
                    {
                        name: "组件栏", //显示//不显示
                        value: 'componentBox',
                        isShow: false
                    },
                    {
                        name: "编辑",
                        value: 'editShow',
                        isShow: false
                    },
                    {
                        name: "通用编辑栏",
                        value: 'editBox',
                        isShow: false
                    },
                    {
                        name: "发布路径设置",
                        value: 'publishHref'
                    }
                ]
            },
            {
                name: "扩展组件",
                list: [
                   {
                       name: "从库里面选择新增组件",
                       value: 'chooseNewComponent'
                   },
                   {
                       name: '绘制新组件',
                       value: 'drawNewComponent'
                   },
                   {
                       name: '默认组件布局', //flex布局设置
                       value: 'defaultViewSet'
                   },
                   {
                       name: '图标库', //flex布局设置
                       value: 'iconBox'
                   }
                ]
            }, 
            {
                name: "发布",
                value: 'publish',
                list: [
                    
                ]
            },
             {
                name: "导入",
                value: 'import',
                list: [
                ]
            },
            {   
                name: "帮助",
                list: [
                   {
                        name: "还原菜单位置",
                        value: 'restoreListPosition'
                        //如果组件是显示出来的，就把组件的位置放置到菜单初始位置
                   },
                   {
                       name: "保存当前位置",
                       value: 'storeCurrentPosition'
                   }, 
                   {
                       name: "显示当前所有菜单位置",
                       value: 'showCurrentAllPosition'
                       // 是否锁定组件 
                       // 组件
                       // editBox小盒子（删除组件什么的）
                   },
                   {
                       name: "开启提示消息",
                       value: 'OpenTips',
                       isShow: false
                   },
                   {
                       name: "页面引导",
                       value: 'helper',
                       isShow: false
                   }
                ]     
            }    
        ],
        isShowAll: false,
        isHoverButton: false,
        isClickButton: false,
        currentChoose: null,
        showTableList: []
    }
  },
  methods: {
       change(){
           if(!this.isShowAll){
               this.isShowAll = true;
               //获取store里面的值
               this.getStoreData();
               //console.log("ddddddddddd");
           }
       },
       getStoreData(){
           var values = this.$store.getters.getBottomValue;
           this.lists.forEach((item) => {
               if(item.list.length > 0){
                   item.list.forEach((dom) => {
                       if(typeof(dom.isShow) == 'boolean'){
                           var name = dom.value;
                           var isTureOrFalse = values['is'+name];
                           dom.isShow = isTureOrFalse; 
                       }
                   });
               }    
           });
       },
       hoverButton(key){
           if(this.isClickButton) return false;

           this.setChooseTableList(key);
       },
       clickButoonThing(key){
           var item = this.lists[key];
           if(item.list.length > 0){
               this.isClickButton = true;
               this.setChooseTableList(key);
           }else{
               //一级按钮的显示
               this.consoleTest('false');
               this.$store.commit('setButtomTrue', item.value);
           }
       },
       setChooseTableList(key){
           this.isHoverButton = true; //是否移动到按钮上面
           this.currentChoose = key;

           var list = (this.lists[key]).list;
           this.showTableList = list;
       },
       leaveButton(){
           this.isHoverButton = false;
       },
       MenuListShow(){
            console.log('consoleTest');
        //    this.isHoverButton = true;
       },
       hiddenAllBottom(){
            this.isShowAll = false;
            this.isHoverButton = false;
            this.currentChoose = null;
            this.showTableList = [];
            this.isShowAll = false;
            this.consoleTest('false');
       },
       consoleTest(value){
           if(value == 'false'){
               this.isClickButton = false;
           }else{
               var item = this.showTableList[value];
               if(typeof(item.isShow) == 'boolean'){
                   this.$store.commit('changeButtomValue', item.value);
               }else{
                    this.$store.commit('setButtomTrue', item.value);
                    this.hiddenAllBottom();
               }
               this.getStoreData();
           }
       }
   },
   created(){
       this.$nextTick(() => {
           var bottomList = document.getElementsByClassName('bottomList')[0];
       });
   }
}
</script>
<style scoped lang="scss">
$color: #cddc39;
$number: 10;
.bottomList{
    height: 100%;
    width: 2px;
    background: grey;
    position: fixed;
    bottom: 0px;
    left: -1px;
    opacity: 0;
    z-index: 15;
   
}
.bottomAllList{
    width: 100%;
    height: 30px;
    opacity: 0.6;
    background: #eee;
    position: fixed;
    bottom: 0px;
    right: 0px;
    z-index: 11;
    box-sizing: border-box;
    padding: 0px 20px;
    transition: bottom ease 0.15s, width ease 0.25s 0.2s, background-color ease 0.3s;
    text-align: left;
    vertical-align: top;
    &:hover{
        opacity: 1;
    }
    .button-box{
        display: inline-block;
    }
    .title{
        font-size: 13px;
        color: #99a9bf;
        padding: 0px 10px;
        line-height: 30px;
        background: #eee;
        display: inline-block;
        transition: all ease-in-out 0.12s, top ease 0.12s 0.3s;
        cursor: pointer;
        position: relative;
        &:hover{
            background: $color;
            color: white;
            transform: scale(1.2);
            top: -2px;
            text-shadow: 0px 0px 2px rgba(0,0,0,0.5);
            z-index: 10;
            padding-right: 10px;
        }
    }
    .title-choose{
        background: $color !important;
        color: white;
        transform: scale(1.2);
        top: -2px;
        text-shadow: 0px 0px 2px rgba(0,0,0,0.5);
        z-index: 10;
        padding-right: 10px !important;
    }
    .hidden{
        position: absolute;
        right: 10px;
        top: 50%;
        transform:rotate(180deg);
        transition: all ease-in-out 0.8s;
        margin-top: -7px;
        cursor: pointer;
        &:hover{
            transform: rotate(360deg+360deg) scale(1.7);
            color: $color;
        }
    }
}
.bottomAllList-dis{
    bottom: -30px;
    width: 1%;
}
.bottomAllList-change{
    background: white;
    opacity: 1;
    border-top: 1px solid #eee;
    .title{
        background: none;
        padding-right: 20px;
        // color: #5d6774;
    }
}
.ListDetail{
    width: 100%;
    height: calc(100% - 30px);
    background: rgba(0,0,0,0);
    position: fixed;
    left: 0px;
    top: 0px;
    transition: all ease  0.5s 0s;
    z-index: 8;
    .allMenuBox{
        width: 200px;
        height: auto;
        position: absolute;
        bottom: 20px;
        left: 0px;
        .menu{
            transition: all ease 0.8s;
            width: 0%;
            font-size: 16px;
            padding: 14px 0px;
            text-align: center;
            background: black;
            overflow: hidden;
            color: white;
            white-space: nowrap;
            animation: mymove 0.5s 1;
            cursor: pointer;
            animation-fill-mode: forwards;
            text-align: left;
            position: relative;
            @for $i from 0 through $number
            {
                    &:nth-of-type(#{$i}){
                        animation: mymove 0.5s 1;
                        animation-delay: (0.12s+$i*0.12s);
                        animation-fill-mode: forwards;
                }
            }
            &:hover{
                left: 30px;
                background: $color;
                color: grey;
                span{
                    color: black;
                }
            }
            span{
                position: absolute;
                right: 10px;
                top: 16px;
                color: $color;
                opacity: 0.4;
            }
        }
        .menu-close{
            width: 40px;
            height: 40px;
            position: absolute;
            right: -100px;
            top: -6px;
            font-size: 30px;
            text-align: center;
            cursor: pointer;
            transition: all ease 0.4s;
            i{
                line-height: 40px;
            }
            &:hover{
               transform: rotate(180deg) scale(0.6);
            }
        }
    }
}
@keyframes mymove
{
    from { width: 0%; }
    to   { width: 100%; padding-left: 30px; }
}
   
.ListDetail-hidden{
    left: -100%;
    transition: all ease  0.5s 0.6s;
    .allMenuBox{
        .menu{
            width: 0%;
            animation: hiddenButton 0.5s 1;
        //     overflow: hidden;
        //     transition: all ease 0s;
        //      @for $i from 0 through $number
            @for $i from 0 through $number
                {
                    &:nth-of-type(#{$i}){
                        animation: hiddenButton 0.5s 1;
                        animation-delay: 0;
                        animation-fill-mode: forwards;
                    }
                }
      
        }
        .menu-close{
            display: none;
        }
    }
}

@keyframes hiddenButton
{
    from { width: 100%; padding-left: 30px; }
    to   { width: 0%;  }
}
</style>