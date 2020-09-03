<template>
    <div>
        <div class="bottomList"  @mousemove="change"></div>
        <div :class="{'bottomAllList':true, 'bottomAllList-dis': !isShowAll, 'bottomAllList-change': isHoverButton}">
            <div class="button-box" @mouseenter="hoverButton" @mouseleave="leaveButton">
                <div class="title" v-for="(item, key) in lists" :key="key">{{item.name}}</div>
                    <!-- 1.历史记录  2.组件栏 3.编辑box显示  4.菜单显示设置-->
                    <!-- <div class="title">菜单</div>
                    <div class="title">扩展组件</div>
                    <div class="title">发布</div>
                    <div class="title">帮助</div> -->
                </div>
            <div class="el-icon-caret-bottom hidden"></div>
        </div>
        <div :class="{'ListDetail':true, 'ListDetail-hidden': !isHoverButton}" ></div>
        <!-- @mouseenter="change" -->
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
                name: "body设置",
                list: []
            },
            {
                name: "菜单",
                list: [
                    {
                        name: "历史记录"
                    },
                    {
                        name: "组件栏"
                    },
                    {
                        name: "编辑显示"
                    },
                    {
                        name: "菜单显示设置"
                    }
                ]
            },
            {
                name: "扩展组件",
                list: [
                    
                ]
            }, 
            {
                name: "发布"
            },
            {
                name: "帮助"
            }    
        ],
        isShowAll: false,
        isHoverButton: false,
        isClickButton: false
    }
  },
  methods: {
       change(){
           this.isShowAll = true;
       },
       hoverButton(){
           this.isHoverButton = true;
       },
       leaveButton(){
           this.isHoverButton = false;
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
    // &:hover{
    //     background:  black;
    //     .title{
    //         // background: black;
    //     }
    // }
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
    .hidden{
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -8px;
        cursor: pointer;
    }
}
.bottomAllList-dis{
    bottom: -30px;
    width: 1%;
}
.bottomAllList-change{
    background: none;
    border-top: 1px solid #eee;
    .title{
        background: none;
        padding-right: 20px;
        // color: #5d6774;
    }
}
.ListDetail{
    width: 200px;
    height: calc(100% - 30px);
    background: black;
    position: fixed;
    left: 0px;
    top: 0px;
    transition: all ease  0.5s;
    z-index: 8;
}
.ListDetail-hidden{
    left: -200px;
}
</style>