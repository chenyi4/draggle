var fs =require("fs");
const url = require('url');
/**
 *  获取所有的class和class文件
 *  getClassStyle?fileName=flex父类&name=class1
 */
var getClassStyle = function(request, response){
    var path = __dirname+'./../files';
    

    let {query} = url.parse(request.url,true);
    let {fileName, name} = query;
    var promiseSet =  new Promise((resolve,reject) => {
        const files = fs.readFile(path+'/'+fileName+'/'+name+'.json',"utf-8",function(err, data){
            resolve(data);
        });
    });

    promiseSet.then((value) => {
        response.setHeader("Content-type","application/json");
        response.end(JSON.stringify({className: name, type: JSON.parse(value)}));
    });
    
}

exports.init = getClassStyle;