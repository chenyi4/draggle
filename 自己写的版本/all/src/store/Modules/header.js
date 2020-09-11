import eventHub from '@/event-hub/index';
const header = {
    state: {
        allBoolean: {
            isbodySet: false, //body设置
            isscaleDraw: false, //缩小放大画布栏
            ishisTory: false, //历史记录
            iscomponentBox: false, //组件栏
            iseditShow: false, //编辑显示
            iseditBox: true, //通用编辑栏
            ispublishHref: false, //发布路径设置
            ischooseNewComponent: false, //从库里面选择新增组件
            isdrawNewComponent: false, //绘制新组件
            isdefaultViewSet: false, //默认组件布局
            isiconBox: false, //图标库
            isrestoreListPosition: false, //还原菜单位置
            isstoreCurrentPosition: false, //保存当前位置
            isshowCurrentAllPosition: false, //显示当前所有菜单位置
            isOpenTips: false, //提示
            ishelper: false, //页面引导
            
            ispublish: false, //发布
            isimport: false //导入
        }
    },
    getters: {
        getBottomValue: (state) => {
            return state.allBoolean;
        }
    },
    mutations: {
        changeButtomValue: (state,name) =>{
            state.allBoolean['is'+name] = !state.allBoolean['is'+name];
            // if( state.allBoolean['is'+name]){
            // console.log(name);
            eventHub.$emit(eventHub.header['SHOW_'+name]);
            // }
            
        },
        setButtomTrue: (state,name) => {
            try{
                state.allBoolean['is'+name] = true;
                eventHub.$emit(eventHub.header['SHOW_'+name]);
            }catch(e){
                console.log(e);
                console.log('%c没有注册头部事件变量','color:red');
            }
        },
        setButtomFalse: (state,name) => {
            state.allBoolean['is'+name] = false;
            eventHub.$emit(eventHub.header['SHOW_'+name]);
        }
    }
};

export default header;