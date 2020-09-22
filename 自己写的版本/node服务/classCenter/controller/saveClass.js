var fs =require("fs");
const url = require('url');
var querystring = require('querystring');
var util = require('util');

var saveClass = function(request, response){
    //获取post的参数
    var post = '';
    var path = __dirname+'./../files';

    request.on('data', function (chunk) {
        post += chunk;
    });
    var back = new Promise((resolve,reject) => {
        request.on('end', function () {
            var data = JSON.parse(post);
            resolve(data);
        });
    });

    back.then((data) => {
        
        //查询文件，如果是文件夹，就到目录下面创建json文件

        let stat = fs.lstatSync(path+'/'+data.fileName);
        if (stat.isDirectory() === true) { 
            fs.writeFile(path+'/'+data.fileName+'/'+ data.name + '.json', JSON.stringify(data.content, null,'\t'), function (err) {
                console.log(err);
            });
        }
        // console.log(data.fileName);
        // console.log(data.name);
        // console.log(data.content);

        response.setHeader("Content-type","application/json");
        response.end(JSON.stringify(data));
    });
    

   
    // console.log("保存CLASS调用了");
   
}

exports.init = saveClass;