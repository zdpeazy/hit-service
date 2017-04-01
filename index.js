//服务器配置
var config = {
	'ip': '192.168.1.158',
	'port':'3000',
}

var http = require('http');
var fs = require('fs');
var kpi = require('./post');

var app = http.createServer(function(req,res){
	if(req.url!='/favicon.ico'){
		kpi.postCrate(req, res);
		res.writeHead(200, {"Content-Type": "text/plain;charset:utf-8"});
		res.end('');
	}
});
app.listen(config.port);
console.log('server run in http://www.xiaoman.com/');
