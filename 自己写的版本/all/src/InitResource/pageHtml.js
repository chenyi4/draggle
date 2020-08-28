import {blob} from '@/api/index';
import eventHub from '@/event-hub/index';

class pageHtml {

    constructor() {
    }

    typeHtml(configI, configE, table) {
        //type 多种类型
        let inputName = configI;
        if (table == 'table') {
            inputName = configI.split('.')[0] + '[0].' + configI.split('.')[1];
        }

        let backkey = '';
        if (configE.backkey != undefined) {
            backkey = configE.backkey;
        }
        let servername = '';
        if (configE.servername != undefined) {
            servername = configE.servername;
        }

        let pDisplay = '';
        if (configE.display != undefined) {
            pDisplay = configE.display;
        }
        let pReadonly = '';
        if (configE.readonly != undefined) {
            pReadonly = configE.readonly;
        }

        let check = '';
        if (configE.elementtype != undefined) {
            //{=format=:=1=}
            $.each(configE.elementtype, function (i, e) {
                switch (e) {
                    case '1':
                        check += '=format=:=1=,'
                }
            })
            check = check.substr(0, check.length - 1);
            check = '{' + check + '}'
        }

        let content = '';
        if (configE.content != undefined) {
            content = configE.content;
        }

        let inputhtml = '';
        switch (configE.type) {
            case 'select':
                if (configE.optionVal != undefined) {
                    let optionValArr = configE.optionVal;
                    $.each(optionValArr, function (i, e) {
                        inputhtml += '<option value="' + e.value + '">' + e.text + '</option>';
                    })
                }
                inputhtml = '<select name="' + inputName + '" pReadonly="' + pReadonly + '" >' + inputhtml + '</select>'
                break
            case 'check':
                if (configE.optionVal != undefined) {
                    let optionValArr = configE.optionVal;
                    $.each(optionValArr, function (i, e) {
                        inputhtml += '<label><input type="checkbox"  name="' + inputName + '"  value="' + e.value + '"  pReadonly="' + pReadonly + '" ><span>' + e.text + '</span></label>';
                    })
                }
                break
            case 'radio':
                if (configE.optionVal != undefined) {
                    let optionValArr = configE.optionVal;
                    $.each(optionValArr, function (i, e) {
                        let checked = '';
                        if (i == 0) {
                            checked = 'checked'
                        }
                        inputhtml += '<label><input type="radio"  name="' + inputName + '"  value="' + e.value + '" pReadonly="' + pReadonly + '"  ' + checked + '><span>' + e.text + '</span></label>';
                    })
                }
                break
            case 'date':
                //date 只能readonly
                inputhtml = '<input type="text"  name="' + inputName + '"  class="layui-input datepicker"  check="' + check + '"  pReadonly="' + pReadonly + '"  readonly>';
                break
            case 'time':
                //date 只能readonly
                inputhtml = '<input type="text"  name="' + inputName + '"  class="layui-input timepicker"  check="' + check + '"  pReadonly="' + pReadonly + '"  readonly>';
                break
            case 'datetime':
                //date 只能readonly
                inputhtml = '<input type="text"  name="' + inputName + '"  class="layui-input datetimepicker"  check="' + check + '"  pReadonly="' + pReadonly + '"  readonly>';
                break
            case 'back':
                inputhtml = '<input type="text"  name="' + inputName + '"  backkey="' + backkey + '" servername="' + servername + '" class="layui-input"  check="' + check + '" pReadonly="' + pReadonly + '"  readonly><i class="fa fa-search back"></i>';
                break
            case 'textarea':
                inputhtml = '<textarea class="layui-input"  check="' + check + '" pReadonly="' + pReadonly + '"></textarea>';
                break
            case 'staticText':
                inputhtml = '<span>' + content + '</span>';
                break
            default:
                inputhtml = '<input type="text"  name="' + inputName + '"  class="layui-input"  check="' + check + '" pReadonly="' + pReadonly + '" >';
        }
        return [inputhtml, pDisplay, configE.type]
    }

    //buttonArr, ServiceNameShort, MainTableName, pageKey, type
    buttonHtml(json, type, searchType) {
        let buttonArr = json.buttonArr;
        let PageKey = json.PageKey;
        let ServiceNameShort = json.ServiceNameShort;
        let MainTableName = json.MainTableName;

        if (buttonArr == '') {
            return '';
        }
        let opeBtn = $('<div class="opeBtn"></div>');

        if (buttonArr.length > 0) {
            $.each(buttonArr, function (i, e) {
                let addClass = '';
                if (type == "form") {
                    addClass = 'formBtn ' + e.name + 'form';
                } else {
                    addClass = 'listBtn ' + e.name + 'form';
                }
                let buttonHtml = $('<button parm="/' + ServiceNameShort + '/' + MainTableName + '/" pageKey="' + PageKey + '" class="layui-btn layui-btn-primary ' + addClass + '" name="' + e.name + '"  title="' + e.text + '" >' + e.text + '</button>');

                if (e.name == 'refresh') {
                    //没有接口的刷新和列表
                    buttonHtml.attr("onclick", "location.reload()");
                } else if (e.name == 'search') {
                    buttonHtml.attr("listType", searchType);
                } else if (e.name == 'filter') {
                    buttonHtml.attr("filterval", "");
                } else if (e.name == 'configuration') {
                    buttonHtml.attr("infoval", "");
                }

                opeBtn.append(buttonHtml);
            })
        }

        return opeBtn;
    }

    addedit(json) {
        //dataTabJson, buttonArr, pageKey
        let dataTabJson = json.dataTabJson;
        let allThings = json.allThings;

        let objectId = json.objectId;
        let PageKey = json.PageKey;
        let searchType = json.IsTree;
        let GroupName = json.GroupName;
        let ServiceNameShort = json.ServiceNameShort;
        let MainTableName = json.MainTableName;

        const self = this;

        let formHtml = $('<form name="custab">');
        let tabLNum = -1;
        $.each(dataTabJson, function (i, e) {
            let tabNum = i.split('tab')[1].split('');
            if (tabNum[0] > tabLNum) {
                let custab = $('<div class="custab"></div>');
                formHtml.append(custab);
                let custabtit = $('<div class="custabtit"></div>');
                let custabcon = $('<div class="custabcon"></div>');
                custab.append(custabtit);
                custab.append(custabcon);
                tabLNum = tabNum[0];
            }

            let custabtits = $('<div class="custabtits" tab="' + e.tabname + '" title="' + e.tabname + '">' + e.tabname + '</div>');
            let custabcons = $('<div class="custabcons" tab="' + e.tabname + '"></div>');

            let custabtit = formHtml.find('.custab').last().find('.custabtit');
            let custabcon = formHtml.find('.custab').last().find('.custabcon');
            custabtit.append(custabtits);
            custabcon.append(custabcons);
            //第一个tab加select
            if (custabtit.find('.custabtits').length == 1) {
                custabtit.find('.custabtits').first().addClass('select');
                custabcon.find('.custabcons').first().addClass('select');
            }

            let config = dataTabJson[i]['config'];
            if (!$.isEmptyObject(config)) {
                let layui_form_item = $('<div class="layui-form-item"></div>');
                custabcons.append(layui_form_item);
                $.each(config, function (configI, configE) {
                    let gridWidth = '';
                    if (configE.gridWidth == 2) {
                        gridWidth = 'width: calc(66%);'
                    } else if (configE.gridWidth == 3) {
                        gridWidth = 'width: calc(99%);'
                    }
                    let layui_inline = $('<div class="layui-inline" style="' + gridWidth + '"></div>');
                    let labelHtml = $('<label class="layui-form-label" title="' + configE.text + '">' + configE.text + '</label>');
                    let layui_input_inline = $('<div class="layui-input-inline"></div>')
                    let inputHtml = self.typeHtml(configI, configE)[0];
                    if (self.typeHtml(configI, configE)[1] == 'none') {
                        //layui-inline
                        layui_inline.hide();
                    }
                    layui_form_item.append(layui_inline);
                    if (self.typeHtml(configI, configE)[2] != 'staticText') {
                        layui_inline.append(labelHtml);
                    }
                    layui_inline.append(layui_input_inline);
                    layui_input_inline.append(inputHtml);
                })
            }

            let addeditconfig = dataTabJson[i]['addeditconfig'];
            if (!$.isEmptyObject(addeditconfig)) {
                let addcopydel = $('<div class="addcopydel"></div>');
                custabcons.append(addcopydel);

                //表格头上的按钮
                let addeditbutton = dataTabJson[i]['addeditbutton'];
                if (addeditbutton.length > 0) {
                    let btnGroup = $('<div class="btnGroup"></div>');
                    addeditbutton.forEach((e, i) => {
                        if (e != 'false') {
                            let button = $('<button class="' + e.split('_')[0] + '" type="button">' + e.split('_')[1] + '</button>');
                            btnGroup.append(button);
                        }
                    })
                    addcopydel.append(btnGroup);
                }

                let tableHtml = $('<table class="addedit layui-table"></table>');
                let theadHtml = $('<thead><tr></tr></thead>');
                let tbodyHtml = $('<tbody><tr></tr></tbody>');
                addcopydel.append(tableHtml);
                tableHtml.append(theadHtml);
                tableHtml.append(tbodyHtml);
                $.each(addeditconfig, function (addeditconfigI, addeditconfigE) {
                    let thName = addeditconfigI.split('.')[0] + '[].' + addeditconfigI.split('.')[1];
                    let thHtml = $('<th name="' + thName + '" type="' + addeditconfigE.type + '">' + addeditconfigE.text + '</th>');
                    let tdHtml = $('<td></td>');
                    let inputHtml = self.typeHtml(addeditconfigI, addeditconfigE, 'table')[0];
                    if (self.typeHtml(addeditconfigI, addeditconfigE, 'table')[1] == 'none') {
                        //layui-inline
                        tdHtml.hide();
                        thHtml.hide();
                    }
                    tdHtml.append(inputHtml);
                    theadHtml.find('tr').append(thHtml);
                    tbodyHtml.find('tr').append(tdHtml);
                })
            }
        })

        let opeBtn = this.buttonHtml(json, 'form', searchType);

        let allHtml;
        if (opeBtn == '') {
            allHtml = '<div class="platform">' + formHtml[0].outerHTML + '</div>';
        } else {
            allHtml = '<div class="platform">' + opeBtn[0].outerHTML + formHtml[0].outerHTML + '</div>';
        }

        let css = `
            .layui-input-inline label {
                margin-right: 8px;
            }
            .layui-input-inline label input {
                margin-right: 4px;
            }
        `;

        let valueFun = `
            let url = testDomainName + '/${ServiceNameShort}/${MainTableName}/getPage/change/${PageKey}';
            editspe(url);
        `;

        //pReadonly() 是标准化那边的方法   otherFun计算   opeFun一条龙
        let fun = valueFun + this.otherFun(allThings) + 'pReadonly();pOpeFun();';
        let funAdd = this.otherFun(allThings) + 'pReadonly();pOpeFun();';
        let funView = valueFun + 'iframeReadonly();';
        self.downLoadPage({
            //allHtml, 'add', fun, pageKey
            'allHtml': allHtml,
            'filename': 'add',
            'fun': funAdd,
            'css': css,
            'objectId': objectId,
            'PageKey': PageKey,
            'GroupName': GroupName,
            'MainTableName': MainTableName
        });
        self.downLoadPage({
            //allHtml, 'add', fun, pageKey
            'allHtml': allHtml,
            'filename': 'edit',
            'fun': fun,
            'css': css,
            'objectId': objectId,
            'PageKey': PageKey,
            'GroupName': GroupName,
            'MainTableName': MainTableName
        });
        self.downLoadPage({
            //allHtml, 'add', fun, pageKey
            'allHtml': allHtml,
            'filename': 'copy',
            'fun': fun,
            'css': css,
            'objectId': objectId,
            'PageKey': PageKey,
            'GroupName': GroupName,
            'MainTableName': MainTableName
        });
        self.downLoadPage({
            //allHtml, 'add', fun, pageKey
            'allHtml': allHtml,
            'filename': 'view',
            'fun': funView,
            'css': css,
            'objectId': objectId,
            'PageKey': PageKey,
            'GroupName': GroupName,
            'MainTableName': MainTableName
        });
    }

    back(json) {
        let PageKey = json.PageKey;
        let objectId = json.objectId;
        let GroupName = json.GroupName;
        let ServiceNameShort = json.ServiceNameShort;
        let MainTableName = json.MainTableName;

        let backFun = `
            var backParm = backPageParm();
            var jsonStr = JSON.stringify(backParm.jsonStr);
            var backKey = backParm.backKey;
            var serverName = localStorage.getItem("serverName");
            
            var searchbackUr='';
            if(jsonStr != "{}"){
                searchbackUrl = testDomainName+'/${ServiceNameShort}/common/back/${MainTableName}/'+backKey+'/'+jsonStr;
            }else{
                searchbackUrl = testDomainName+'/${ServiceNameShort}/common/back/${MainTableName}/'+backKey+'/ ';
            }
            
            var searchbackListUrl = testDomainName+'/${ServiceNameShort}/common/backList/${MainTableName}/'+backKey;
            searchback(searchbackUrl,searchbackListUrl, serverName);
        `;

        let backHtml = `
                <div>
                    <table id="backlist"></table>
                    <div id="backpager"></div>
                    <button class="backinfo none">确定</button>
                </div>
        `;

        this.downLoadPage({
            'allHtml': backHtml,
            'filename': 'back',
            'fun': backFun,
            'css': '',
            'objectId': objectId,
            'PageKey': PageKey,
            'GroupName': GroupName,
            'MainTableName': MainTableName
        });
    }

    search(json) {
        //buttonArr, pageKey, type
        let PageKey = json.PageKey;
        let searchType = json.IsTree;
        let objectId = json.objectId;
        let GroupName = json.GroupName;
        let ServiceNameShort = json.ServiceNameShort;
        let MainTableName = json.MainTableName;

        let opeBtn = this.buttonHtml(json, 'list', searchType);

        let searchFun = `
                var pageInitUrl = testDomainName + '/${ServiceNameShort}/${MainTableName}/getList/${PageKey}';
                pageInit(pageInitUrl);
                var delProUrl = testDomainName + '/${ServiceNameShort}/common1/deleteSearch/${PageKey}/';
                var addProUrl = testDomainName + '/${ServiceNameShort}/common1/saveSearch/${PageKey}';
                tableOpe(addProUrl,delProUrl);
                pOpeFun();
        `;
        let treeSearchFun = `
                var treeUrl = testDomainName + '/${ServiceNameShort}/${MainTableName}/getTree/${PageKey}';
                var addParentsUrl = testDomainName + '/${ServiceNameShort}/${MainTableName}/addParentTree/${PageKey}';
                var addLeafsUrl = testDomainName + '/${ServiceNameShort}/${MainTableName}/addLeafTree/${PageKey}';
                var editsUrl = testDomainName + '/${ServiceNameShort}/${MainTableName}/editTree/${PageKey}';
                var removesUrl = testDomainName + '/${ServiceNameShort}/${MainTableName}/removeTree/${PageKey}';
                tree(treeUrl,addParentsUrl,addLeafsUrl,editsUrl,removesUrl,'platform');
                pOpeFun();
        `;

        let searchHtml = `
                <div>
                    <div id="pager"></div>
                    <table id="list"></table>
                    <button class="zkbg">表格全展开</button>
                </div>
        `;
        let treesearchHtml = ` 
                <div class="row">   
                    <div class="col-md-2">
                        <div>
                            <a id="addParents" class="topboutom">增加</a>
                            <a id="removes" class="topboutom">删除</a>
                            <a id="cancelSelectedNode" class="topboutom">不选中</a>
                            <a id="edits" class="topboutom">修改</a>
                        </div>
                        <ul id="treeDemo" class="ztree"></ul>
                        <input type="hidden" value="" id="createtreeid">
                        <input type="hidden" value="" id="selectTreeNode">
                    </div>
                    <div class="col-md-10">
                        <iframe src="search.html" style="width:100%; height: 500px;" ></iframe>
                    </div>
                </div>
        `;

        if (searchType == "search") {
            let html;
            if (opeBtn == '') {
                html = searchHtml;
            } else {
                html = opeBtn[0].outerHTML + searchHtml;
            }
            this.downLoadPage({
                //html, 'search', searchFun, pageKey
                'allHtml': html,
                'filename': 'search',
                'fun': searchFun,
                'css': '',
                'objectId': objectId,
                'PageKey': PageKey,
                'GroupName': GroupName,
                'MainTableName': MainTableName
            });
        } else if (searchType == "treesearch") {
            let html;
            if (opeBtn == '') {
                html = treesearchHtml;
            } else {
                html = opeBtn[0].outerHTML + treesearchHtml;
            }
            this.downLoadPage({
                //html, 'treesearch', treeSearchFun, pageKey
                'allHtml': html,
                'filename': 'treesearch',
                'fun': treeSearchFun,
                'css': '',
                'objectId': objectId,
                'PageKey': PageKey,
                'GroupName': GroupName,
                'MainTableName': MainTableName
            });
            this.downLoadPage({
                //searchHtml, 'search', searchFun, pageKey
                'allHtml': searchHtml,
                'filename': 'search',
                'fun': searchFun,
                'css': '',
                'objectId': objectId,
                'PageKey': PageKey,
                'GroupName': GroupName,
                'MainTableName': MainTableName
            });

        }
    }

    //生成页面 除渲染页面之外的function
    otherFun(allThings) {
        console.log(allThings);
        let arr = [];
        $.each(allThings, function (i, e) {
            let EventList = e.EventList;
            $.each(EventList, function (ii, ee) {

                let json = {};
                if (ee.EventGroup == 'valueUpdateEvent') {
                    json['trigger'] = 'change'
                } else if (ee.EventGroup == 'keyEnterEvent') {
                    json['trigger'] = 'keyup'
                }

                let Value = ee.Value.Value;

                if (Value.includes('>') || Value.includes('<')) {
                    json['type'] = 'comparison';
                    json['formula'] = Value;
                    json['formulaCn'] = '请正确输入！'
                } else if (Value.includes('sum(')) {
                    json['type'] = 'sum';
                    //需要平台那边规范格式 =号左边是resultName
                    let ValueArr = Value.split('=');
                    json['resultName'] = ValueArr[0].trim();
                    json['participateName'] = ValueArr[1].trim().replace('sum(', '').replace(')', '');
                } else if (Value.includes('avg(')) {
                    json['type'] = 'ave';
                    //需要平台那边规范格式 =号左边是resultName
                    let ValueArr = Value.split('=');
                    json['resultName'] = ValueArr[0].trim();
                    json['participateName'] = ValueArr[1].trim().replace('avg(', '').replace(')', '');
                } else if (Value.includes('=')) {
                    json['type'] = 'calculation';
                    //需要平台那边规范格式 =号左边是resultName
                    let ValueArr = Value.split('=');
                    json['resultName'] = ValueArr[0].trim();
                    json['formula'] = ValueArr[1].trim();
                } else if (Value.includes('uniqueCheck(')) {
                    json['type'] = 'only';
                    json['participateName'] = Value.replace('uniqueCheck(', '').replace(')', '');
                }
                arr.push(json);
            })
        })


        let str = ``;
        $.each(arr, function (i, e) {
            let eStr = JSON.stringify(e);
            if (e.type == 'sum' || e.type == 'ave') {
                str += `pSimCal(${eStr});`
            } else if (e.type == 'calculation' || e.type == 'comparison' || e.type == 'intersection') {
                str += `pEval(${eStr});`
            } else if (e.type == 'only') {
                str += `pOnlyVal(${eStr});`
            }
        })
        return str

    }

    //下载页面
    downLoadPage(json) {
        //html, filename, fun, objectId
        let html = json.allHtml;
        let filename = json.filename;
        let fun = json.fun;
        let css = json.css;
        let objectId = json.objectId;
        let GroupName = json.GroupName;
        let PageKey = json.PageKey;
        let MainTableName = json.MainTableName;

        html = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Title</title>
                    <link rel="stylesheet" type="text/css" href="./../../../css/allPlatform.css">
                    <style type="text/css">
                        ${css}
                    </style>
                </head>
                <body >
                    ${html}
                </body>
                <script type="text/javascript" src="./../../../js/allPlatform.js"></script>
                <script type="text/javascript">
                    $(document).ready(function(){
                        ${fun}
                    })
                </script>
                </html>`;

        let blobHtml = new Blob([html], {"type": "text/html"});

        let formdata = new FormData();
        formdata.append("file", blobHtml, filename + ".html");
        formdata.append("objectId", objectId);
        formdata.append("groupName", GroupName);
        formdata.append("pageKey", PageKey);
        formdata.append("mainTableName", MainTableName);
        /*for (var value of formdata.values()) {
            console.log(value);
        }*/
        blob.blob(formdata, (data) => {
            if (data.code == 0 && filename == 'search') {
                eventHub.$emit(eventHub.notify.MESSAGE, "发布成功");
            }
        });

        let a = document.createElement('a');
        let url = window.URL.createObjectURL(blobHtml);
        a.href = url;
        a.download = filename + ".html";
        a.click();
        window.URL.revokeObjectURL(url);
    }

}

export default pageHtml;