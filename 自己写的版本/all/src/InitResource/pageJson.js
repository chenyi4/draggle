import pageHtml from "@/InitResource/pageHtml";

var generateHtml = new pageHtml();

class pageJson {
    constructor() {
    }

    pageForm(json) {
        //data, button, PageKey, IsTree
        let data = json.allList;
        let button = json.allButtons;
        let allThings = json.allThings;
        let objectId = json.objectId;
        let PageKey = json.PageKey;
        let IsTree = json.IsTree;
        let GroupName = json.GroupName;
        let ServiceNameShort = json.ServiceNameShort;
        let MainTableName = json.MainTableName;

        data = data.filter(key => key.componentType != 1);

        const dataTab = data.filter(key => key.componentType == 2);
        let dataTabJson = this.pageFormTab(dataTab);

        const dataInput = data.filter(key => key.componentType == 4 || key.componentType == 7 || key.componentType == 20 || key.componentType == 11 || key.componentType == 12 || key.componentType == 13 || key.componentType == 14 || key.componentType == 15 || key.componentType == 16);
        let dataInputJson = this.pageFormInput(json, dataInput);

        const dataTable = data.filter(key => key.componentType == 6);

        dataTabJson = this.assemblyTabData(dataTabJson, dataInputJson, dataTable);

        let buttonArr = '';
        if (button != '') {
            buttonArr = this.pageFormButton(button);
        }
        generateHtml.addedit({
            'IsTree': IsTree ? 'treesearch' : 'search',
            'dataTabJson': dataTabJson,
            'buttonArr': buttonArr,
            'allThings': allThings,
            'objectId': objectId,
            'PageKey': PageKey,
            'GroupName': GroupName,
            'ServiceNameShort': ServiceNameShort,
            'MainTableName': MainTableName,
        });
        generateHtml.back({
            'objectId': objectId,
            'PageKey': PageKey,
            'GroupName': GroupName,
            'ServiceNameShort': ServiceNameShort,
            'MainTableName': MainTableName,
        });
        generateHtml.search({
            'IsTree': IsTree ? 'treesearch' : 'search',
            'buttonArr': buttonArr,
            'allThings': allThings,
            'objectId': objectId,
            'PageKey': PageKey,
            'GroupName': GroupName,
            'ServiceNameShort': ServiceNameShort,
            'MainTableName': MainTableName,
        });
    }

    pageFormTab(dataTab) {
        let jsonTab = {};
        dataTab.forEach((e, i) => {
            let dataTabChildren = e.children;
            dataTabChildren.forEach((ee, ii) => {
                jsonTab['tab' + i + ii] = {
                    'id': ee.hash,
                    'tabname': ee.title,
                    'config': {},
                    'value': {},
                    'addeditconfig': {},
                    'addeditvalue': {},
                    'addeditbutton': []
                }
            })
        })
        return jsonTab;
    }

    pageFormInput(json, dataInput) {
        let jsonInput = {};
        dataInput.forEach((e, i) => {
            let type = e.componentType;
            let optionVal = '';
            let name = e.name.split('(')[0];
            switch (type) {
                case 4:
                    type = 'text'
                    if (e.backInfer) {
                        type = 'back'
                    }
                    break
                case 7:
                    type = 'textarea'
                    break
                case 20:
                    type = 'staticText';
                    name = 'staticText' + i;
                    break
                case 11:
                    type = 'select';
                    optionVal = e.optionVal;
                    break
                case 12:
                    type = 'check';
                    optionVal = e.optionVal;
                    break
                case 13:
                    type = 'radio';
                    optionVal = e.optionVal;
                    break
                case 14:
                    type = 'date';
                    break
                case 15:
                    type = 'time';
                    break
                case 16:
                    type = 'datetime';
                    break
            }
            name = e.name.split('(')[0];
            if (name.includes('_')) {
                //message = formula.replace(/(.+?)\((.+?)\)(\s+)(.+?)(\s+)(.+?)\((.+?)\)/ig, "$2$3$4$5$7");
                name = name.replace(/\w/i, function ($1) {
                    return $1.toLocaleUpperCase()
                })
                name = name.replace(/_\w/ig, function ($1) {
                    return $1.replace('_', '').toLocaleUpperCase()
                })
            }
            jsonInput[name] = {
                'parentId': e.parentHash,
                'row': 0,
                'col': i,
                'type': type,
                'text': e.title,
                'gridWidth': e.length,
                //'readonly'
            }
            if (e.readonly != undefined) {
                jsonInput[name]['readonly'] = e.readonly
            }
            if (e.view != undefined) {
                jsonInput[name]['display'] = e.view == 1 ? 'block' : 'none'
            }
            if (e.elementtype != undefined) {
                jsonInput[name]['elementtype'] = e.elementtype
            }
            if (e.optionVal != undefined) {
                jsonInput[name]['optionVal'] = e.optionVal
            }
            if (e.context != undefined) {
                jsonInput[name]['content'] = e.context
            }
            if (e.backInfer) {
                jsonInput[name]['backkey'] = e.backInfer.RefKey
                jsonInput[name]['servername'] = json.GroupName
            }
        })
        return jsonInput;
    }

    //拼装数据
    assemblyTabData(dataTabJson, dataInputJson, dataTable) {
        for (let key1 in dataTabJson) {
            for (let key2 in dataInputJson) {
                if (dataTabJson[key1]['id'] == dataInputJson[key2]['parentId']) {
                    //普通
                    dataTabJson[key1]['config'][key2] = dataInputJson[key2];
                    delete dataInputJson[key2];
                }
            }
        }

        //表格   因为列的顺序在dataTableChildren，所以只能这么写
        dataTable.forEach((e, i) => {
            for (let key1 in dataTabJson) {
                //表格上的按鈕
                let dataTableAddLine = e.AddLine == true ? 'addrow_新增行' : 'false';
                let dataTableCopyLine = e.CopyLine == true ? 'copyrow_复制行' : 'false';
                let dataTableDeleteLine = e.DeleteLine == true ? 'delrow_删除行' : 'false';
                let dataTableOpenTable = e.OpenTable == true ? 'togle_展开表格' : 'false';
                let dataTableButton = [dataTableAddLine, dataTableCopyLine, dataTableDeleteLine, dataTableOpenTable];
                dataTabJson[key1]['addeditbutton'] = dataTableButton;

                if (e.parentHash == dataTabJson[key1]['id']) {
                    let dataTableChildren = e.children;
                    dataTableChildren.forEach((ee, ii) => {
                        for (let key2 in dataInputJson) {
                            if (ee.hash == dataInputJson[key2]['parentId']) {
                                dataInputJson[key2]['index'] = ii;
                                delete dataInputJson[key2]['row'];
                                delete dataInputJson[key2]['col'];
                                dataInputJson[key2]['text'] = ee.title;
                                dataTabJson[key1]['addeditconfig'][key2] = dataInputJson[key2];
                            }
                        }
                    })
                }
            }
        })


        return dataTabJson
    }

    //button
    pageFormButton(button) {
        let buttonArr = [];
        button.forEach((e, i) => {
            let Properties = e.Properties;
            let Properties_Button = Properties.Button;
            let Properties_Name = Properties.Name;
            let buttonJson = {
                'name': Properties_Button,
                'text': Properties_Name
            }
            buttonArr.push(buttonJson);
        })
        return buttonArr;
    }

}

export default pageJson;