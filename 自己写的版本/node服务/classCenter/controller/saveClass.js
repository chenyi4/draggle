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

    var text = "保存成功";
    var ixExist = true;
   

    
     back.then((data) => {
            fs.access(path+'/'+data.fileName, (err) => {
                if(!err){

                }else{
                    if(err.code == "ENOENT"){
                        text = ("文件夹不存在");
                        ixExist = false;
                    }
                }
            }); 
            //查询文件，如果是文件夹，就到目录下面创建json文件
            try{
                if(!ixExist){
                    text = "不存在该文件";
                    response.setHeader("Content-type","application/json");
                    response.end(JSON.stringify({value: text}));
                    return false;
                }else{
                    let stat = fs.lstatSync(path+'/'+data.fileName);
                    if (stat.isDirectory() === true) { 
                        end = new Promise((resolve,reject) => {
                            fs.writeFile(path+'/'+data.fileName+'/'+ data.name + '.json', JSON.stringify(data.content, null,'\t'), function (err) {
                                if(err){
                                    text = "保存失败";
                                }else{
                
                                }
                                resolve();
                            });
                        });
                    }else{
                    
                    }
                }
                end.then(() => {
                    response.setHeader("Content-type","application/json");
                    response.end(JSON.stringify({value: text}));
                });
            }catch(error){
                text = error;
                response.setHeader("Content-type","application/json");
                response.end(JSON.stringify({value: text}));
            }
        });
    // console.log("保存CLASS调用了");
}

exports.init = saveClass;