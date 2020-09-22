const url = require('url');
var fs =require("fs");

var deleteClass = function(request, response){

    let {query} = url.parse(request.url,true);
    let {fileName, name} = query;

    var path = __dirname+'./../files';
    const files = fs.readdirSync(path);
    var isExist = false;

    files.forEach(function (item, index) {
        if (item === fileName) {
            var details = fs.readdirSync(path+'/'+item);
            details.forEach(function(detail, index){
                if(detail == (name+'.json')){
                    fs.unlinkSync(path+'/'+item+'/'+detail);
                    isExist = true;
                }
            });
        }
    });

    // console.log(fileName);
    // console.log(name);
    response.setHeader("Content-type","application/json");
    response.end(JSON.stringify({value: isExist?"已删除该文件":"不存在该文件", isExist: isExist}));
}

exports.init = deleteClass;