import Vue from 'vue';

var eventHub = new Vue();

eventHub.api = {
    NOT_LOGGED_IN: 'api.not_logged_in'
};

eventHub.drawing = {
    ADD_PART: 'drawing.add.add_part',
    COPY_PARTS: 'drawing.copy_parts',
    CUT_PARTS: 'drawing.cut_parts',
    PASTE_PARTS: 'drawing.paste_parts',
    SET: 'drawing.set',
    CHANGE_DRAW_DATA: 'draw.out.data.change.store.change',
};


eventHub.setright = {
    SET_PARAM: 'set.right.param',
    SER_PAGE_PARAM: 'set.page.param',
    CLEAR: 'clear.right',
    GET_CURRENT_DOM: 'get.current_dom',
    EDIT_ALL_SET: 'edit.all.open',
    EDIT_All_CLOSE: 'edit.all.close',
    OBJREF_DATA_OPEN: 'object_refer_open',
    EDIT_CHANGE_OPEN: 'edit.change.open',
    SQL_BASE_OPEN: 'sql.base.open',
    BACK_EDIT_OPEN: 'back.edit.open',
    ALL_THING_OPEN: 'all.thing.open',
    OBJ_REFER_ADD_OPEN: 'obj.refer.add.open',
    OBJ_SEARCH_OPEN: 'obj.search.open',
    SET_TABLE_DATE: 'set.table.date',
    SET_RIGHTLIST_SHOW: 'set.rightCols.ShowAndHide',
    FLOWCARD_SHOW:'flowcard.layer.show'
};

eventHub.datestore = { /**历史记录 */
    BEFORE_SET: 'date.to.before',
    NEXT_SET: 'date.to.next',
    SHOW_HISTORY: 'history.show',
    SET_HISTORY: 'history.set'
}

eventHub.notify = {
    ERROR: 'error.message',
    ASK: 'message.ask',
    MESSAGE: 'message.show'
}

eventHub.changewindow = {
    HIDE_LEFT_MODULE:'leftmodule.hidden',
    SHOW_LEFT_MODULE:'leftmodule.show',
    SCALE_CENTER: 'center.scale',
    SCALE_SET: 'center.scale.set'
}

eventHub.center = {
    SHOW_LOADING: 'center.loading.show',
    HIDE_LOADING: 'center.loading.hide',
    SHOW_TABLE: 'datetable.show',
    HIDDEN_TABLE: 'datetable.hidden',
    SHOW_LINK_TABLE: 'linktable.show',
    LINK_TABLE_DATA_BACK: 'linktable.back'
}

eventHub.head = {
    MAKE_UP: 'module.makeup',
    ADD_PAGE: 'page.add'
}

eventHub.lefttree = {
    RELOAD: 'lefttree.reload',
    RELOADNOW: 'lefttree.current.reload'
}

eventHub.rightkeyword = {
    DATA_CHANGE: 'center.date.update'
}

eventHub.allWords = {
    GET_ALLWORDS: 'words.data.get'
}

eventHub.rightCollapse = {
    KEY_WORD_OPAEN: 'open.keyword.layer',
    SET_CODE: 'set.param.code',
    SEARCH_BACK: 'search.back',
    SEARCH_BACK_DATA: 'search.back.data'
}

eventHub.button = {
    RELOAD_ALL_BUTTON: 'allbutton.change.reload'
}

eventHub.property = { //头部编辑
    PROPERTY_EDIT_SHOW: 'property.edit.show',
    EDIT_WORDS_SHOW: 'edit.wordedit.show'
}

eventHub.dataDiction = { //数据字典
    SHOW: 'dataDiction.show',
}


export default eventHub;