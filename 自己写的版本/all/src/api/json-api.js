import axios from 'axios';
import _ from 'lodash';
import eventHub from '@/event-hub/index';
//139.217.236.17:8090
class JsonAPI {
    static  _authHeader;

    constructor(){
        this._axios = axios.create({
            method: 'post',
            header: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            responseType: 'json',
            timeout: 10000
        });
        this.baseUrl =  process.env.NODE_ENV == 'production'?process.env.VUE_APP_HOST:'';
    }


    set authConf(conf){
        this._authConf = conf;
    }

    authorize(){
        if(!this._authConf){
            throw new Error('No authorization conf.');
        }
        var {url, account} = this._authConf;
        return this._request(url, account).then(
            data => {
                if(data.result && data.result.token){
                    this._authHeader = {
                        Authorization: 'Bearer' + data.result.token
                    };
                    return true;
                }
                return false;
            }
        );
    }
    clearAuthInfo(){
        this._authHeader = null;
    }

    requestWithAuth(url, args, conf, fun){
        // if(!this._authHeader){
        //     eventHub.$emit(eventHub.api.NOT_LOGGED_IN); //事件通知
        //     return Promise.resolve(null);
        // }

        // if(!conf.header){
        //     conf.headers = {};
        // }
        _.assign(conf.headers, this._authHeader);
        return new Promise((resolve, reject) => {
               this._request(this.baseUrl+url, args, conf)
                .then((date) => {
                    if(date.code == 1){
                        eventHub.$emit(eventHub.notify.MESSAGE, date.message);
                    }
                    resolve();
                    if(fun){  
                        fun(date); 
                    }
                });
                // .catch(err => {
                //     var data = err.response.data;
                //     if(data && data.code === 401003){
                //         this.authorize().then(
                //             successful => {
                //                 if(successful) {
                //                     _.assign(conf.headers, this.authHeader);
                //                     return this._request(url, args, conf);
                //                 }

                //                 eventHub.$emit(eventHub.api.NOT_LOGGED_IN);
                //                 return null;
                //         })
                //         .then(resolve)
                //         .catch(reject);
                //     }
                //     else {
                //         reject(err);
                //     }
                // })
        });
    }

    _request(url, args, conf){
        if(conf == 'get'){
            return this._axios.get(url, args, conf)
                .then(res => {
                    return res.data;
            });
        }else{
            return this._axios.post(url, args, conf)
                .then(res => {
                    return res.data;
            });
        }
    }
};
const json = new JsonAPI();

export default json;

//动态组件 广播数据