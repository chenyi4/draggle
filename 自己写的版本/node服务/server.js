var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var util = require('util');

function setHtml(POST){
    var components;
    for(var item in POST){
        var oneItem = JSON.parse(item);
        components = oneItem.all;
    }
    var Alldiv = ``;
    if(!components) return false;
    if(components.length > 0){
        components.forEach((item) => {
            var style = item;
            if(style){
                Alldiv = Alldiv + `
                    <div class="box"
                        style="width:`+style.width+`;
                            height: `+style.height+`;
                            position: `+style.position+`;
                            left: `+style.left+`;
                            top: `+style.top+`;
                            background-color: `+style['backgroundColor']+`;
                            color: `+style.color+`;
                            font-size: `+style.fontSize+`;
                            border:`+style.border+`;
                            border-radius: `+style.borderRadius+`;
                            border-color: `+style.borderColor+`;
                            border-style: `+style.borderStyle+`;
                            border-width: `+style.borderWidth+`;
                            z-index: `+style.zIndex+`;
                            display: `+style.display+`;
                            word-wrap: break-word;
                            word-break: normal;
                            justify-Content: `+style.justifyContent+`;
                            align-items:`+style.alignItems+`;
                            align-self:`+style.alignSelf+`;
                        "
                        
                    >`+(style.content?style.content:'')+`</div>
                `;
            }
        });
    }
    
    return  `<head>
                <link href="./test.css" rel="stylesheet"/>
            </head>
            <body>
                <div class="all">
                `+Alldiv+`
                </div>
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
                position: relative;
                background: `+body.mainColor+`;
                `+(body.height=='auto'?`min-height: 100%;`:``)+`
            }
            .box{
                border: 1px dashed #8bc34a;
            }
    `;
}

function createHtml(POST) {  
    fs.writeFile("./all/test.html", 
    setHtml(POST)
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