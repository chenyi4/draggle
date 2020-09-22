import  jsonAPI from '../json-api';

var thingFlowDate = {
    save( data,fun){
        return jsonAPI.requestWithAuth('/all', data,'', fun);
    },
    saveClass( data,fun){
        console.log(data);
        return jsonAPI.requestWithAuth('/saveClass', data,'', fun);
    }
    // getFlowData(objectId, fun){
    //     return jsonAPI.requestWithAuth('/processControl/getAllPageKeys/'+objectId, '','get', fun);
    // },
    // deleteRefNode(objectId, refId, fun){
    //     return jsonAPI.requestWithAuth('/reference/deleteRefNode/'+objectId+'/'+refId, '','get', fun);
    // }
}

export default thingFlowDate;