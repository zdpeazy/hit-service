var request = require('request');
var logicM = require('./logic');
module.exports = { 
	postCrate : function(req, res){
		var setCookie = logicM.setCookie(req, res);
		var logic = logicM.logic(req, res); 
		var getClientIp =  logicM.getClientIp(req); 
		var checkClinetModel = logicM.checkClinetModel(req);
		var data = {
			"name":logic.query.name,
			"descs":logic.query.descs,
			"href":logic.href,
			"pathname":logic.pathname,
			"ipaddress":getClientIp,
			"uuid":setCookie,
			"device":checkClinetModel,
			"time":logic.time,
			"resinfoid":logic.query.id,
		}
		request({
		    url: "http://hiasoo.f3322.net:14200/_sql",
		    method: "POST",
		    headers: {
		        "content-type": "application/json",
		    },
		    //body: JSON.stringify({ "stmt": "insert into query (name, descs, href , pathname, ipaddress, uuid, device , time , resinfoid) values(\'"+data.name+"\',\'"+data.descs+"\',\'"+data.href+"\',\'"+data.pathname+"\',\'"+data.ipaddress+"\',\'"+data.uuid+"\',\'"+data.device+"\',\'"+data.time+"\',\'"+data.resinfoid+"\') " })
		    body: JSON.stringify({ "stmt": "insert into query (name, descs, href , pathname, ipaddress, uuid, device , time , resinfoid) values('"+data.name+"','"+data.descs+"','"+data.href+"','"+data.pathname+"','"+data.ipaddress+"','"+data.uuid+"','"+data.device+"','"+data.time+"','"+data.resinfoid+"') " })
		}, function(error, response, body) {
			console.log(response.statusCode);
		    if (!error && response.statusCode == 200) {
		    	if(error){
		    		console.log(error);
		    	}else{
		    		console.log('插入数据成功！');
		    	}
		    }
		});	   
	}
}