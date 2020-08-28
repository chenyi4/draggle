import { storeDefault } from './../defaultDate'
const type1 = {
    state: {
       param:{
         typename: 'type1',
         moduleName: '切换组件',
         parentName: '', //hash值
        //  X: storeDefault.left,
        //  Y: storeDefault.top,
         childName: storeDefault.childName,
         parentHash: '',
         permissionNum: 101,
         isDragable: true,
         //数据层的数据
         hash: 0,
         "componentId":'', /* 组件ID */
         "componentType":2, /* 组件类型 tab-box  */
         // "Title":"",
        //  "Name": "",
         "seq":1,
         "children":[
             {
                 "componentId": '', /* 组件ID */
                 "componentType":3, /* 组件类型 tab  */
                 "title":"标题1",
                 "name":"",
                 "seq":1,
                 "children":[
                     
                 ]
             },
         ]
       }
    }
  }
  
  export default type1;