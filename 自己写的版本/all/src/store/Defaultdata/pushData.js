/** 下推 - 选单 */
const list = {
    paramType: { //参数方式
        "ParamType": 0, //0：参数方式
        "TargetTableId": 12, //目标单据
        "TargetTableName": '', //！！！我自己加的
        "Where": "", //筛选条件
        "PushFields": [
            // {
                // "SourceTableId": "",
                // "SourceFieldId": "", //原数据字段,
                // "SourceDisplayName":"",
                // "TargetTableId": "",
                // "TargetFieldId": "目标数据字段",
                // "TargetDisplayName":""
            // }
        ]    
    },
    codeType: { //脚本方式
        "ParamType": 1, //参数类型  1:脚本方式
        "TargetObjectKey": "", //目标单据
        "TargetObjectName": "", //目标单据名称 (！！！自己加进去的)
        "JoinParam": "", //关联参数(！！！没有这个，可以删除掉)
        "Sql": "" //sql语句
    },
    pluginType: { //插件方式
        "ParamType": 2, //"参数类型  2:插件方式"
        "TargetTableId": "", //目标单据
        "TargetTableName": "",
        "TableId": "",
        "TableName": "",
        "SourceEntity": [
         
        ],
        "OutParam": "", //出参
        "MethodName": "", //方法名
        "Location": "", //插件路径
        "FieldList": []
    },
    paramTypeCurrent: {
        currentFileds: {
          "SourceTableId": "",
          "SourceFieldId": "", //原数据字段,
          "SourceDisplayName":"",
          "TargetTableId": "",
          "TargetFieldId": "目标数据字段",
          "TargetDisplayName":""
        }
    }
}

export default list;
    