import Vue from 'vue';

var eventHub = new Vue();

eventHub.api = {
    NOT_LOGGED_IN: 'api.not_logged_in'
};

eventHub.header = {
    SHOW_BODY_SET: 'body.set.show', //显示body设置
    SHOW_BODY_SCALE: 'body.scale.show', //显示body放大缩小
    SHOW_HISTORY: 'menus.history.show', //显示历史记录
    SHOW_COMPONENTS: 'menus.components.show', //显示组件栏
    SHOW_EDIT_LAYER: 'menus.editLayer.show', //显示对组件编辑
    SHOW_DEIT_BOX: 'menu.editbox.show', //显示编辑box.屏幕上黑色的那个

    SHOW_COMPONENTS_ADD: 'components.add.show', //显示新增库组件
    SHOW_COMPONENTS_DRAW: 'components.draw.show', //显示绘制新增的组件

    SHOW_HELP_RESTARTAll: 'help.allposition.restart', //重置所有的菜单位置

}

export default eventHub;