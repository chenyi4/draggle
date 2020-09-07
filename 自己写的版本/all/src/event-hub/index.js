import Vue from 'vue';

var eventHub = new Vue();

eventHub.api = {
    NOT_LOGGED_IN: 'api.not_logged_in'
};

eventHub.header = {
    SHOW_bodySet: 'body.set.show', //显示body设置
    SHOW_scaleDraw: 'body.scale.show', //显示body放大缩小
    SHOW_hisTory: 'menus.history.show', //显示历史记录
    SHOW_componentBox: 'menus.components.show', //显示组件栏
    SHOW_editShow: 'menus.editLayer.show', //显示对组件编辑
    SHOW_editBox: 'menu.editbox.show', //显示编辑box.屏幕上黑色的那个
    SHOW_publishHref: 'menu.set.publish', //发布路径设置
    SHOW_chooseNewComponent: 'menu.add.newcomponents.show',//从库里面选择新增组件
    SHOW_drawNewComponent: 'menu.draw.component.show', //绘制新组件
    SHOW_defaultViewSet: 'menu.defaut.view.set', //默认组件布局
    SHOW_iconBox: 'menu.iconbox.show', //图标库
    SHOW_restoreListPosition: 'menu.position.restart', //还原菜单位置
    SHOW_storeCurrentPosition: 'menu.current.position.save', //保存当前位置
    SHOW_showCurrentAllPosition: 'menu.current.allmenus.show', //显示当前所有菜单位置
    SHOW_OpenTips: 'menu.tips.show', //提示
    SHOW_helper: 'menu.page.follow.show', //页面引导

    SHOW_publish: 'menu.publish', //发布
    SHOW_import: 'menu.import' //导入
}

export default eventHub;