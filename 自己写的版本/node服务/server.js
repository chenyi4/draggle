var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var util = require('util');

function setHtml(){
    return  `<head>
                <link href="./test.css" rel="stylesheet"/>
            </head>
            <body>
                <div class="all"></div>
            </body>
    `;
}

function setCSS(POST) {
    var body;
    for(var item in POST){
        var oneItem = JSON.parse(item);
        body = oneItem.body;
    }
    return  `body{
                margin:0px;padding: 0px; 
                background: `+body.bodyColor+`
            }
            .all{ 
                width: `+body.width+`;
                margin: 0 auto;
                height: `+body.height+`;
                background: `+body.mainColor+`;
                `+(body.height=='auto'?`min-height: 100%;`:``)+`
            }
    `;
}

function createHtml(POST) {  
    fs.writeFile("./all/test.html", 
    setHtml()
    , function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });


    fs.writeFile("./all/test.css", 
    setCSS(POST)
    , function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

http.createServer(function(req, res){
    var post = '';

    req.on('data', function (chunk) {
        post += chunk;
    });

   

    req.on('end',function(){
        var POST = querystring.parse(post);
        var pararms = JSON.stringify(POST);
      
        createHtml(POST);
    });

    res.write('<head><meta charset="utf-8"/></head><body>打开当前目录查看</body>');

    res.end();

}).listen(3000);