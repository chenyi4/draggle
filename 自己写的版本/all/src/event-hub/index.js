import Vue from 'vue';

var eventHub = new Vue();

eventHub.api = {
    NOT_LOGGED_IN: 'api.not_logged_in'
};

eventHub.header = {
    SHOW_BODY_SET: 'body.set.show'
}

export default eventHub;