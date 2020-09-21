const url = require('url');
var fs =require("fs");
/**
 *  创建class 文件
 *  createClassFile?fileName=flex父类
 */
var createClassFile = function(request, response){
   

    let {query} = url.parse(request.url,true);
    let {fileName} = query;

    var path = __dirname+'./../files';
    const files = fs.readdirSync(path);
    var isExist = false;
   
    files.forEach(function (item, index) {
        if (item === fileName) {
            isExist = true;
        }
    });
    var text = fileName+"创建成功!";
    if(!isExist){
        fs.mkdir(path+'/'+fileName, function(err, data){
           if(err){

           }else{
              
           }
        });
    }else{
        text = "文件已经存在";
    }

    response.setHeader("Content-type","application/json");
    response.end(JSON.stringify({value: text}));
};

exports.init = createClassFile;