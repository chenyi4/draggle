import  jsonAPI from '../json-api';

var thingFlowDate = {
    save(objectId, data,fun){
        return jsonAPI.requestWithAuth('/processControl/addOrUpdateRelations/'+objectId, data,'', fun);
    },
    getFlowData(objectId, fun){
        return jsonAPI.requestWithAuth('/processControl/getAllPageKeys/'+objectId, '','get', fun);
    },
    deleteRefNode(objectId, refId, fun){
        return jsonAPI.requestWithAuth('/reference/deleteRefNode/'+objectId+'/'+refId, '','get', fun);
    }
}

export default thingFlowDate;