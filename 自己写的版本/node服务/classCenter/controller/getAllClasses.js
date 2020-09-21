var fs =require("fs");
var getAllClasses = function(request, response){
    var _data = [];
    var path = __dirname+'./../files';
    const files = fs.readdirSync(path);
    files.forEach(function (item, index) {
        let stat = fs.lstatSync(path + '/'+ item);
        if (stat.isDirectory() === true) { 
            var allFiles = fs.readdirSync(path + '/'+ item);
            var children = [];
            allFiles.forEach(function(child, index){
                var childrenName = child.replace('.json', '');
                let file = fs.readFile(path + '/'+ item+'/'+child, "utf-8", function(err, data){
                    
                });
                children.push({ 
                    name: childrenName
                });
            });
            _data.push({
                fileName: item,
                children: children
            });
        }
    });

    response.setHeader("Content-type","application/json");
    response.end(JSON.stringify(_data));
}

exports.init = getAllClasses;