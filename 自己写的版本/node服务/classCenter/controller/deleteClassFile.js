const url = require('url');
var fs =require("fs");

var deleteClassFile = function(request, response){
    //判断是否存在这个文件夹
    //存在 => 删除
    //不存在 => 返回不存在
    let {query} = url.parse(request.url,true);
    let {fileName} = query;

    var path = __dirname+'./../files';
    const files = fs.readdirSync(path);
    var back = "文件不存在";

    files.forEach(function (item, index) {
       if(item == fileName){
        let stat = fs.lstatSync(path + '/'+ item);
         if (stat.isDirectory() === true) { 
            fs.rmdir(path + '/'+ item, ()=> {
                
            });
            back = "文件删除成功";
         }
       }
    });
    console.log(back);
    response.setHeader("Content-type","application/json");
    response.end(JSON.stringify({
        value: back
    }));
}

exports.init = deleteClassFile;