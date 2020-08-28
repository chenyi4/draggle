import { storeDefault } from './../defaultDate'
const tableBottom = {
    state: {
       param:{
          typename: 'tableBottom',
          moduleParam: 'TableBottom',
          moduleName: '底部表格',
          parentHash: '', //hash值
          x: storeDefault.left,
          y: storeDefault.top,
          permissionNum: 99, /*可拖拽权限等级*/
          isDragable: true, /*是否可以拖拽*/
          defaultChildren: {
            title: "标题",
            componentType: 'inputtext1',
            componentTypeName: "文本输入框",
            hash: null
          },
          children: [
             {
                title: "标题",
                componentType: 'inputtext1',
                componentTypeName: "文本输入框"
             }
          ],
          "componentId": '', /* 组件ID 唯一 */
          "componentType":6, /* 组件类型  */
         //  "title":"",
         //  "Name":"",
          "hash": 11122232,
          AddLine: true,
          CopyLine: true,
          DeleteLine: true,
          OpenTable: true
       }
    }
  }
  export default tableBottom;